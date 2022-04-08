const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../../db/models").users;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/users/google/callback",
};

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: profile.emails[0].value,
        provider: profile.provider,
      },
      defaults: {
        password: profile.emails[0].value,
        lastName: profile.name.familyName,
        firstName: profile.name.givenName,
        userImage: profile.photos[0].value,
        accessToken,
        refreshToken,
      },
    });
    // console.log(created);
    return done(null, user);
  } catch (error) {
    console.log("passport google error");
    done(error, false);
  }
};

module.exports = new GoogleStrategy(googleConfig, googleVerify);
