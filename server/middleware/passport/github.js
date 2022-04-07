const { Strategy: GitHubStrategy } = require("passport-github2");
const User = require("../../db/models").users;

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/users/github/callback",
};

const githubVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log(profile);
    const [user, created] = await User.findOrCreate({
      where: {
        email: profile.emails[0].value,
        provider: profile.provider,
      },
      defaults: {
        password: profile.emails[0].value,
        lastName: profile.displayName,
        firstName: profile.displayName,
        userImage: profile.photos[0].value,
        accessToken,
        refreshToken,
      },
    });

    return done(null, user);
  } catch (error) {
    console.log("passport gitbub error");
    return done(error, false, "github 로그인 실패");
  }
};

module.exports = new GitHubStrategy(githubConfig, githubVerify);
