const router = require("express").Router();
const upload = require("../middleware/multers3");
const ApiError = require("../error/ApiError");
const auth = require("../middleware/auth");

const { AWS_S3_OBJECT_PATH } = process.env;

router.get("/", (req, res) => {
  console.log("cool");
  // res.json(req.auth);
  res.send("boards");
});

router.post(
  "/upload/:path",
  (req, res, next) => {
    req.params.path += "/tmp";
    next();
  },
  upload.single("boardFile"),
  (req, res, next) => {
    try {
      const { uploadPath, imgName } = req.imageInfo;
      const filePath = AWS_S3_OBJECT_PATH + uploadPath + imgName;
      res.status(200).json({ filePath });
    } catch (error) {
      next(ApiError.serverError(error, 500, "/api/boards/upload Error!!"));
    }
  }
);

router.get("/first", (req, res) => {
  console.log("cool");
  // res.json(req.auth);
  res.send("first");
});

module.exports = router;
