const express = require('express')
const router = express.Router()
const db = require('../../server')
const formidable = require('express-formidable');
router.use(formidable());



// @route POST api/profile
// @desc Create new profile
// @access private

router.post('/', (req, res) => {
    //req.fields contains non-file fields 
    //req.files contains files 
    const fields = req.fields
    const profilePhoto = req.files
    console.log(fields)
    console.log(profilePhoto)
    const profile_name = fields.profileName
    const profile_Bio = fields.profileBio
    // db.query("INSERT INTO Profile VALUES (?, ?, ?);", email, (err, result) => {

    // }

    res.send(JSON.stringify(req.fields));
})


module.exports = router
