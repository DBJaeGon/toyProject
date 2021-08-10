function ApiErrorTest (code, message) {
    this.code = code;
    this.message = message;
};

ApiErrorTest.notFound = (msg) => {
    return new ApiErrorTest(404, msg)
};

ApiErrorTest.badRequest = function(msg) {
    return new ApiErrorTest(400, msg);
};

ApiErrorTest.internal = (msg) => {
    return new ApiErrorTest(500, msg);
}

module.exports = ApiErrorTest;