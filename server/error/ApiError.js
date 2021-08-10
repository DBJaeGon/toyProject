function ApiError(code, err) {
    this.code = code;
    this.errObj = err;
}

ApiError.serverError = (err, code, msg) => {
    console.log(err ? err : typeof msg === "object" ? msg : "");
    let newErr = {};

    if(typeof msg === "undefined") return new ApiError(code, {message: "server Error"});

    if(typeof msg === "object") {
        newErr.message = msg.message;
    } else {
        newErr.message = msg;
    }
    return new ApiError(code, newErr);
};

module.exports = ApiError;