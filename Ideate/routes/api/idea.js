const express = require('express')
const router = express.Router()
const db = require('../../server')
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs')
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

router.post('/', upload.single('topicImage'), (req, res) => {
    const fields = req.body
    console.log(fields)
    console.log(req.file)
    const topicImage = getImageBuffer(req.file)
    const values = [
        fields.ideaTitle, 
        fields.ideaDescription, 
        fields.potentialDifficulty,
        fields.potentialBrightness,
        fields.topicName,
        topicImage,
        fields.topicDescription,
        fields.profileName
    ]
    db.query("CALL sp_create_idea(?, ?, ?, ?, ?, ?, ?, ?)", values, (err, results) => {
        if (err) {
            console.log(Object.keys(err))
            console.log(err.sqlMessage)
            console.log("there's an error")
            return res.status(500).json({
                msg: "Failure"
            })
        } else {
            console.log("Idea created")
            return res.json({
                msg: "Success"
            })
        }
    })
})



router.get('/', (req, response) => {
    db.query("SELECT * FROM all_ideas_view", (err, results) => afterAllIdeas(response, err, results))
})
const afterAllIdeas = (response, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log(err.sqlMessage)
        console.log("there's an error")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        var ideas = results
        db.query("SELECT * FROM latest_iterations_view", (err, results) => afterLatestIterations(response, ideas, err, results))
    }
}

const afterLatestIterations = (response, ideas, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log(err.sqlMessage)
        console.log("there's an error")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        var full_ideas = []
        var index
        for (index = 0; index < results.length; index++) {
            let full_idea = {
                ...ideas[index],
                ...results[index],
            }
            full_ideas.push(full_idea)
        }
        return response.json({
            msg: "Success",
            ideas: full_ideas
        })
    }
}


module.exports = router
