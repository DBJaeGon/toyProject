const {ExtractJwt, Strategy: JWTStrategy} = require('passport-jwt');
const User = require('../../db/models').users;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};

const JWTConfig = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET_KEY
}

const JWTVerify = async(jwtPayload, done) => {
    try {
        const user = await User.findOne({where: {uid: jwtPayload.uid}});
        
        if(!user) {
            return done(null, false, "올바르지 않은 인증정보입니다.");
        }

        return done(null, user);
    } catch (error) {
        console.log("passport jwt Error")
        return done(error, false);
    }
};

module.exports = new JWTStrategy(JWTConfig, JWTVerify);