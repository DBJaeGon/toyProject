const { CognitoIdentityCredentials } = require("aws-sdk");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const path = require("path");
require("dotenv").config();

const User = require("../../db/models").users;

const { AWS_REGION, AWS_IDENTITY_POOL_ID, AWS_S3_FOLDER_PATH } = process.env;

const bucket = "toy-storage";

AWS.config.update({
  region: AWS_REGION,
  credentials: new CognitoIdentityCredentials({
    IdentityPoolId: AWS_IDENTITY_POOL_ID,
  }),
});

const s3 = new AWS.S3({
  params: { Bucket: bucket },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: async (req, file, cb) => {
      let extension = path.extname(file.originalname);

      const { id, uid } = await User.findOne({ where: { token: req.cookies.token } });
      const uploadPath = AWS_S3_FOLDER_PATH + `/images/${uid}/`;
      const imgName = "Image_" + Date.now().toString() + extension;

      req.imageInfo = { uploadPath, imgName, id };
      cb(null, uploadPath + imgName);
    },
  }),
});

module.exports = upload;
