const { ListObjectsCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client");
const ApiError = require("../../error/ApiError");
const { AWS_S3_FOLDER_PATH } = process.env;

module.exports = async (req, res, next) => {
  try {
    const bucketParams = {
      Bucket: "toy-storage",
      Prefix: AWS_S3_FOLDER_PATH + req.query.path,
    };
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    // console.log("Success", data);
    const images = [];
    if (data.Contents) {
      data.Contents.map((image, idx) => {
        if (image.Size !== 0) images.push(image.Key);
      });
    }
    req.images = images;
    next();
  } catch (error) {
    return next(ApiError.serverError(error, 500, "S3 getListObject Error!"));
  }
};

// Import required AWS SDK clients and commands for Node.js.
// import { GetObjectCommand } from "@aws-sdk/client-s3";
// import { s3Client } from "./libs/s3Client.js"; // Helper function that creates Amazon S3 service client module.
// const { ListBucketsCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
// const { s3Client } = require('./s3Client');

// const bucketParams = {
//   Bucket: "toy-storage",
//   Key: "medias/main/",
// };

// const run = async () => {
//   try {
//     // Create a helper function to convert a ReadableStream to a string.
//     const streamToString = (stream) =>
//       new Promise((resolve, reject) => {
//         const chunks = [];
//         stream.on("data", (chunk) => chunks.push(chunk));
//         stream.on("error", reject);
//         stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
//       });

//     // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
//     const data = await s3Client.send(new GetObjectCommand(bucketParams));
//     console.log(data.Body)
//     //   return data; // For unit tests.
//     // Convert the ReadableStream to a string.
//     const bodyContents = await streamToString(data.Body);
//     console.log(bodyContents);
//       return bodyContents;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
// run();
