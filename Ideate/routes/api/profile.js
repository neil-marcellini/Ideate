const express = require('express')
const router = express.Router()
const db = require('../../server')
const fs = require('fs')
const bodyParser = require('body-parser')
const multer = require('multer');
router.use(bodyParser.urlencoded({
    extended: true
}))



// SET STORAGE
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './uploads')
    // },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({
    storage: storage
})


// @route POST api/profile
// @desc Create new profile
// @access private

router.post('/', upload.single('profileImage'), (req, res) => {
    //req.fields contains non-file fields 
    //req.files contains files
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
    const image = new Buffer.from(encode_image, 'base64')
    const fields = req.body
    console.log(fields)
    const values = [fields.profileName, fields.userId, fields.profileBio, image, new Date()]
    db.query("INSERT INTO Profile VALUES (?, ?, ?, ?, ?);", values, (err, result) => {
        console.log("inserted")
        // console.log(result)
        if (err) {
            console.log(Object.keys(err))
            console.log(err.sqlMessage)
            console.log("there's an error")
            // console.log(err)
            return res.status(500)
        } else {
            console.log("No error")
            return res.json({
                status: "OK"
            })
        }
    })

})


module.exports = router