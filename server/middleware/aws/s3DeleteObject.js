const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client");
const ApiError = require("../../error/ApiError");
const { AWS_S3_FOLDER_PATH } = process.env;

const bucketParams = {
  Bucket: "toy-storage",
};

module.exports = async (req, res, next) => {
  try {
    bucketParams.Key = AWS_S3_FOLDER_PATH + "/images/" + req.params.imgPath + "/" + req.body.name;
    console.log(bucketParams);
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    // console.log("Success", data);
    next();
  } catch (error) {
    return next(ApiError.serverError(error, 500, "S3 deleteObject Error!"));
  }
};
