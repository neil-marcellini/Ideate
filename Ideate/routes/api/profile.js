const express = require('express')
const router = express.Router()
const db = require('../../server')
const formidable = require('express-formidable');
const fs = require('fs')
const { restart } = require('nodemon');
router.use(formidable());



// @route POST api/profile
// @desc Create new profile
// @access private

router.post('/', (req, res) => {
    //req.fields contains non-file fields 
    //req.files contains files 
    const fields = req.fields
    const profilePhoto = req.files.profileImage
    var img = fs.readFileSync(profilePhoto.path)
    var encoded_img = img.toString('base64')
    const image = new Buffer.from(encoded_img, 'base64')
    const values = [fields.profileName, fields.userId, fields.profileBio, image, new Date()]
    db.query("INSERT INTO Profile VALUES (?, ?, ?, ?, ?);", values, (err, result) => {
        console.log("inserted")
        console.log(result)
        if(err) {
            console.log(err)
            return res.status(500)
        } else {
            res.json({
                status: "OK"
            })
        }
    })

})


module.exports = router
