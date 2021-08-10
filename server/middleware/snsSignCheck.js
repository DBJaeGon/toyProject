const User = require('../db/models').users;
const ApiError = require('../error/ApiError');

module.exports = async(req, res, next) => {
    try {
        let user = await User.findOne({where: {email: req.body.email}});
    
        if(!user) {
            await User.create(req.body);
            user = await User.findOne({where: {email: req.body.email}});
        }

        req.user = user;
        next();
    } catch (error) {
        next(ApiError.serverError(error, 500, "sns sign check middleware Error"));
    }
};