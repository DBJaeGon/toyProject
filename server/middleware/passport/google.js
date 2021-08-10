const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../../db/models').users;

const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/users/google/callback"
};

const googleVerify = async(accessToken, refreshToken, profile, done) => {
    try {
        const [user, created] = await User.findOrCreate({where: {
            lastName: profile.name.familyName,
            firstName: profile.name.givenName,
            email: profile.emails[0].value,
            provider: profile.provider,
            accessToken
        }});
        
        return done(null, profile);
    } catch (error) {
        console.log("passport google error");
        done(error, false);
    }
};

module.exports = new GoogleStrategy(googleConfig, googleVerify);