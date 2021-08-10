const passport = require('passport');
const ApiError = require('../error/ApiError');

module.exports = (req, res, next) => {
    try {
        passport.authenticate('jwt', {session: false}, (jwtError, user, msg) => {
            try {
                if(jwtError || !user) {
                    return next(ApiError.serverError(jwtError, 500, msg));
                }
                
                const userInfo = {
                    uid: user.uid,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    userImage: user.userImage,
                    role: user.role,
                    isAuth: true
                }
                req.user = userInfo;
                return next();
            } catch (error) {
                return next(ApiError.serverError(error, 500, "passport authenticate jwt Error"));
            }
        })(req, res, next);
    } catch (error) {
        return next(ApiError.serverError(error, 500, "auth failed!"));
    }
};