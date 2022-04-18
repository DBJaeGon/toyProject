const router = require("express").Router();
const upload = require("../middleware/multers3");
const getChatFiles = require("../middleware/aws/s3GetListObjects");
const deleteChatFile = require("../middleware/aws/s3DeleteObjects");
const ApiError = require("../error/ApiError");

const { AWS_S3_OBJECT_PATH } = process.env;

router.post("/upload/:path", upload.single("chatFile"), (req, res, next) => {
  try {
    const { uploadPath, imgName } = req.imageInfo;
    const filePath = AWS_S3_OBJECT_PATH + uploadPath + imgName;
    res.status(200).json({ filePath });
  } catch (error) {
    next(ApiError.serverError(error, 500, "/api/chat/upload Error!!"));
  }
});

router.delete("/remove", getChatFiles, deleteChatFile, (req, res, next) => {
  try {
    res.status(200).json({ result: "delete!" });
  } catch (error) {
    next(ApiError.serverError(error, 500, "/api/chat/remove Error!!"));
  }
});

module.exports = router;
