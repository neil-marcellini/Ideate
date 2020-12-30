const aws = require('aws-sdk')
var s3;

function setupS3() {
    if (!s3) {
        aws.config.update({
            accessKeyId: process.env.S3_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_KEY,
            region: process.env.S3_REGION
        });
        s3 = new aws.S3();
    }
    return s3;
}

module.exports = setupS3()
