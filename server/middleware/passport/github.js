const { Strategy : GitHubStrategy } = require("passport-github2");
const User = require("../../db/models").users;

const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/users/github/callback"
};

const githubVerify = async(accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({where: { email: profile.emails[0].value, provider: profile.provider }});
        
        if(!user) {
            user = await User.create({
                lastName: profile.username,
                firstName: profile.username,
                email: profile.emails[0].value,
                provider: profile.provider,
                userImage: profile.photos[0].value,
                accessToken
            });
        }
        
        return done(null, user);
    } catch (error) {
        console.log("passport gitbub error");
        return done(error, false, "github 로그인 실패");
    }
};

module.exports = new GitHubStrategy(githubConfig, githubVerify);