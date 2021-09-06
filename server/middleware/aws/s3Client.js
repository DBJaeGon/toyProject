require('dotenv').config();
const { S3Client } = require('@aws-sdk/client-s3');
const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');
const { fromCognitoIdentityPool } = require('@aws-sdk/credential-provider-cognito-identity');

const REGION = process.env.AWS_REGION;
const IDENTITY_POOL_ID = process.env.AWS_IDENTITY_POOL_ID

const s3Client = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({region: REGION}),
        identityPoolId: IDENTITY_POOL_ID
    })
});

module.exports = { s3Client };
