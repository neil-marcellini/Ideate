const express = require('express')
const router = express.Router()
const db = require('../../server')
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

router.post('/', upload.single('topicImage'), (req, res) => {
    const fields = req.body
    console.log(fields)
    console.log(req.file)
})

module.exports = router
