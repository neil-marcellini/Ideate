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
const {s3, getPhoto} = require('../../s3.js')


var upload = multer({
    dest: 'temp/',
    limits: {fieldSize: 2000000}
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

            var params = {
                ACL: 'public-read',
                Bucket: 'ideate-images',
                Body: fs.createReadStream(req.file.path),
                Key: 'profile/' + Date.now() + req.file.originalname
            }

            s3.upload(params, (err, data) => {
                if( err ){
                    console.log( 'profileImgUpload errors', err );
                    res.json( { err } );
                } else {
                    // If Success
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    const profile_photo_file_name = params.Key
                    // Image uploaded, now add entry in db
                    addProfile(res, fields, profile_photo_file_name)
                }
            })

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
