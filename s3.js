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


async function fetchPhoto(file_name) {
    console.log(file_name)
    const photo = s3.getObject({
        Bucket: 'ideate-images',
        Key: file_name
    }).promise()
    return photo
}

function getPhoto(file_name) {
    fetchPhoto(file_name)
        .then((photo) => { return photo})
}

module.exports = {
    s3: setupS3(), 
    getPhoto
}
