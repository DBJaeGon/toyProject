require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../db/models').users;
const ApiError = require('../error/ApiError');

module.exports = async(user) => {
    try {
        const token = jwt.sign(
            { uid: user.uid },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "1d"}
        );
        
        await User.update({token: token }, {
            where: {uid: user.uid}
        });

        return token;
    } catch (error) {
        ApiError.serverError(error, 500, "generate JWT Error!");
    }
};