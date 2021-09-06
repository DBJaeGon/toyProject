const { CognitoIdentityCredentials } = require('aws-sdk');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const path = require('path');
require('dotenv').config();

const { AWS_REGION, AWS_IDENTITY_POOL_ID } = process.env;

const bucket = 'toy-storage';

AWS.config.update({
    region: AWS_REGION,
    credentials: new CognitoIdentityCredentials({
        IdentityPoolId: AWS_IDENTITY_POOL_ID
    })
});

const s3 = new AWS.S3({
    params: {Bucket: bucket}
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            let extension = path.extname(file.originalname);
            cb(null, 'medias/main/homeImage' + Date.now().toString() + extension);
        }
    }),
});

module.exports = upload;