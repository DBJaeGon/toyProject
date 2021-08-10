const {Strategy: LocalStrategy} = require('passport-local');
const User = require('../../db/models').users;
const argon2 = require('argon2');

const localConfig = { usernameField: 'email', passwordField: 'password' };

const passportVerify = async(email, password, done) => {
    try {
        const user = await User.findOne({ where: {email: email}});
        if(!user) {
            return done(null, false, "존재하지 않는 사용자입니다.");
        }
        const comparePassword = await argon2.verify(user.password, password);
        if(!comparePassword) {
            return done(null, false, "올바르지 않은 비밀번호입니다.");
        }
        return done(null, user);
    } catch (error) {
        console.log("passport local Error");
        return done(error, false);
    }
};

module.exports = new LocalStrategy(localConfig, passportVerify);