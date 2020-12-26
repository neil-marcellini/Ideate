const express = require('express')
const router = express.Router()
var db = require('../../db')
const fs = require('fs')
const bodyParser = require('body-parser')
const multer = require('multer');
router.use(bodyParser.urlencoded({
    extended: true
}))
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')


const s3 = new aws.S3({
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY,
    Bucket: 'ideate-images'
});/**
    * Single Upload
    */
const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ideate-images',
        acl: 'publread',
        key: function (req, file, cb) {
            cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
        }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
        checkFileType( file, cb );
    }
}).single('profileImage');

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({
    storage: storage
})

/**
* Check File Type
* @param file
* @param cb
* @return {*}
*/
function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images Only!' );
    }
}



// @route POST api/profile
// @desc Create new profile
// @access private

router.post('/', upload.single('profileImage'), (req, res) => {
    const fields = req.body
    console.log(fields)
    db.query("SELECT profile_name FROM Profile WHERE profile_name=?;", fields.profileName, (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({
                profile_name: fields.profile_name,
                msg: "Sorry, this profile name is taken."
            })
        } else {

            profileImgUpload( req, res, ( error ) => {
                if( error ){
                    console.log( 'errors', error );
                    res.json( { error: error } );
                } else {
                    // If Success
                    const imageName = req.file.key;
                    const imageLocation = req.file.location;
                    // Image uploaded, now add entry in db
                    addProfile(res, fields, imageLocation)
                }
            });


        }
    });
});


const addProfile = (res, fields, imageLocation) => {

    const values = [fields.profileName, fields.userId, fields.profileBio, imageLocation, new Date()]
    db.query("INSERT INTO Profile VALUES (?, ?, ?, ?, ?);", values, (err, result) => {
        if (err) {
            console.log(err.sqlMessage)
            console.log("error on new profile")
            return res.status(500)
        } else {
            return res.json({
                profile_name: fields.profileName
            })
        }
    })
}
module.exports = router
