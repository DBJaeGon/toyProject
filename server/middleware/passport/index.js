const passport = require('passport');
const LocalStrategy = require('./local');
const JWTStrategy = require('./jwt');
// const GoogleStrategy = require('./google');
const GitHubStrategy = require('./github');

module.exports = () => {
    passport.use('local', LocalStrategy);
    passport.use('jwt', JWTStrategy);
    // passport.use('google', GoogleStrategy);
    passport.use('github', GitHubStrategy);
};