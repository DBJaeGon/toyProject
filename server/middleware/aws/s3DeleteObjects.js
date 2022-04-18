const { DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client");
const ApiError = require("../../error/ApiError");
const { AWS_S3_FOLDER_PATH } = process.env;

const bucketParams = {
  Bucket: "toy-storage",
  Delete: { Objects: [] },
};

module.exports = async (req, res, next) => {
  try {
    // console.log(req.images);
    if (!req.images.length) return next();
    req.images.map((file) => {
      bucketParams.Delete.Objects.push({ Key: file });
    });
    // console.log(bucketParams);
    const data = await s3Client.send(new DeleteObjectsCommand(bucketParams));
    // console.log("Success", data);
    next();
  } catch (error) {
    return next(ApiError.serverError(error, 500, "/api/chat/remove :: S3 deleteObjects Error!"));
  }
};
