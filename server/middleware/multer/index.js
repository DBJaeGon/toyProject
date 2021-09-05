const path = require('path');
const multer = require('multer');
const ApiError = require('../../error/ApiError');

const imagePath = path.join(__dirname, '../../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage}).single('mainImage');

module.exports = (req, res, next) => {
    upload(req, res, err => {
        if(err) {
            return next(ApiError.serverError(err, 500, "메인 이미지 업로드 에러!"));
        }
        next();
    });
}; 