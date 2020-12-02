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
    db.query("CALL sp_create_idea(?, ?, ?, ?, ?, ?, ?, ?);", values, (err, results) => {
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
    db.query("SELECT * FROM all_ideas_view;", (err, results) => afterAllIdeas(response, err, results))
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
        db.query("SELECT * FROM latest_iterations_view;", (err, results) => afterLatestIterations(response, ideas, err, results))
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
        const iterations = results
        db.query("SELECT * FROM latest_comment_view;", (err, results) => 
            afterLatestComments(response, ideas, iterations, err, results))
    }
}

const afterLatestComments = (response, ideas, iterations, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        return response.status(500).json({
            msg: "Failure afterLatestComments"
        })
    } else {
        var full_ideas = []
        var index
        for (index = 0; index < results.length; index++) {
            let full_idea = {
                ...ideas[index],
                ...iterations[index],
                comments: [results[index]]
            }
            full_ideas.push(full_idea)
        }
        return response.json({
            msg: "Success",
            ideas: full_ideas
        })
    }
}




// /api/idea/topic/:topic_id

router.get('/topic/:topic_id', (req, response) => {
    const topic_id = req.params.topic_id
    db.query("CALL sp_topic_ideas(?);", topic_id, (err, results) => afterTopicIdeas(response, topic_id, err, results))
})
const afterTopicIdeas = (response, topic_id, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log(err.sqlMessage)
        console.log("there's an error")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        var ideas = results[0]
        console.log("topic ideas")
        console.log(ideas)
        db.query("CALL sp_latest_topic_iterations(?);", topic_id, (err, results) => afterLatestTopicIterations(response, topic_id, ideas, err, results))
    }
}

const afterLatestTopicIterations = (response, topic_id, ideas, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log(err.sqlMessage)
        console.log("there's an error")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        const iterations = results[0]
        console.log("topic iterations")
        console.log(iterations)
        db.query("CALL sp_latest_topic_comments(?);", topic_id, (err, results) => 
            afterLatestTopicComments(response, ideas, iterations, err, results))
    }
}

const afterLatestTopicComments = (response, ideas, iterations, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        return response.status(500).json({
            msg: "Failure afterLatestComments"
        })
    } else {
        console.log("topic comments")
        const comments = results[0]
        console.log(comments)
        var full_ideas = []
        var index
        for (index = 0; index < comments.length; index++) {
            let full_idea = {
                ...ideas[index],
                ...iterations[index],
                comments: [comments[index]]
            }
            full_ideas.push(full_idea)
        }
        return response.json({
            msg: "Successful topic ideas",
            ideas: full_ideas
        })
    }
}


module.exports = router
