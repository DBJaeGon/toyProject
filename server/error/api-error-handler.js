const AipError = require('./ApiError');

module.exports = (err, req, res, next) => {
    console.log(err);

    if(err instanceof AipError) {
        res.status(err.code).json(err.errObj);
        return;
    }

    // res.status(err.code).json(err.errObj);
};