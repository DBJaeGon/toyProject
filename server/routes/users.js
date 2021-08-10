const router = require('express').Router();
const passport = require('passport');
const generateJWT = require('../middleware/generateJWT');
const auth = require('../middleware/auth');
const User = require('../db/models').users;
const ApiError = require('../error/ApiError');

router.post('/signUp', async(req, res, next) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if(user) {
            return next(ApiError.serverError(null, 500, "해당 email은 이미 존재합니다."));
        }
        
        await User.create(req.body);

        res.json({signUpSuccess: true});
    } catch (error) {
        next(ApiError.serverError(error, 500, "signUp Error"));
    }
});

router.post('/signIn', (req, res, next) => {
    try {
        passport.authenticate('local', {session: false}, async(localError, user, msg) => {
            try {
                if(localError || !user) {
                    return next(ApiError.serverError(localError, 500, msg));
                }
                
                const token = await generateJWT(user);

                res.cookie('token', token, {httpOnly: true, secure: false}).status(200).json({signInSuccess: true});
            } catch (error) {
                return next(ApiError.serverError(error, 500, "passport authenticate local Error"));
            }
        })(req, res, next);
    } catch (error) {
        return next(ApiError.serverError(error, 500, "signIn Error"));
    }
});

router.get('/signOut', auth, async(req, res, next) => {
    try {
        await User.update({token: ''}, {
            where: {uid: req.user.uid}
        });

        res.clearCookie("token").status(200).json({signOutSuccess: true});
    } catch (error) {
        return next(ApiError.serverError(error, 500, "signOut Error"));
    }
});

const check = require('../middleware/snsSignCheck');
router.post('/snsSignCheck', check, async(req, res, next) => {
    try {
        const token = await generateJWT(req.user);
    
        res.cookie('token', token, {httpOnly: true, secure: false}).status(200).json({isOAuth: true});
    } catch (error) {
        return next(ApiError.serverError(error, 500, "snsSignCheck Error"))
    }
})

router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.email', 
        'https://www.googleapis.com/auth/userinfo.profile'
    ]
}));

router.get('/google/callback', passport.authenticate("google", {session: false, failureRedirect: "/signIn"}), (req, res) => {
    res.end('login')
    // res.redirect('http://localhost:3000');
});

// router.get('/google/callback', async(req, res, next) => {
//     try {
//         passport.authenticate('google', {session: false}, async(googleError, user, msg) => {
//                 try {
//                     if(googleError || !user) {
//                         return next(ApiError.serverError(googleError, 500, msg));
//                     }

//                     const token = await generateJWT(user);
                    
//                     res.cookie('token', token, {httpOnly: true, secure: false}).status(200).json({googleOAuth: true});
//                 } catch (error) {
//                     next(ApiError.serverError(error, 500, "passport authenticate google Error"));
//                 }
//             })(req, res, next)
//     } catch (error) {
//         next(ApiError.serverError(error, 500, "googleAuth Error"));
//     }
// });

router.get('/auth', auth, (req, res, next) => {
    try {
        if(req.user) {
            res.status(200).json(req.user);
        }
    } catch (error) {
        next(ApiError.serverError(error, 500, "잘못된 인증 정보입니다."));
    }
});

module.exports = router;