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



function getImageBuffer(file) {
    var image = null
    if (file) {
        var img = fs.readFileSync(file.path)
        var encode_image = img.toString('base64')
        image = new Buffer.from(encode_image, 'base64')
    }
    return image
}


// @route POST api/profile
// @desc Create new profile
// @access private

router.post('/', upload.single('profileImage'), async (req, res) => {

    const fields = req.body
    db.query("SELECT profile_name FROM Profile WHERE profile_name=?;", fields.profileName, (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({msg: "Sorry, this profile name is taken."})
        } else {
            console.log(fields)
            const image = getImageBuffer(req.file)
            const values = [fields.profileName, fields.userId, fields.profileBio, image, new Date()]
            db.query("INSERT INTO Profile VALUES (?, ?, ?, ?, ?);", values, (err, result) => {
                console.log("inserted")
                if (err) {
                    console.log(Object.keys(err))
                    console.log(err.sqlMessage)
                    console.log("there's an error")
                    return res.status(500)
                } else {
                    console.log("No error")
                    return res.json({
                        profile_name: fields.profileName
                    })
                }
            })
        }
    })
    

})


module.exports = router