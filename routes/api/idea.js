const express = require('express')
const router = express.Router()
const db = require('../../db')
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs')
router.use(bodyParser.urlencoded({
    extended: true
}))
const {s3, getPhoto} = require('../../s3.js')


var upload = multer({
    dest: 'temp/',
    limits: {fieldSize: 2000000}
})

router.post('/', upload.single('topicImage'), (req, res) => {
    const fields = req.body
    var params = {
        ACL: 'public-read',
        Bucket: 'ideate-images',
        Body: fs.createReadStream(req.file.path),
        Key: 'topic/' + Date.now() + req.file.originalname
    }

    s3.upload(params, (err, data) => {
        if( err ){
            console.log( 'topicImageUpload errors', err );
            res.json( { err } );
        } else {
            // If Success
            fs.unlinkSync(req.file.path); // Empty temp folder
            const topic_photo_file_name = params.Key
            // Image uploaded, now add entry in db
            const values = [
                fields.ideaTitle, 
                fields.ideaDescription, 
                fields.potentialDifficulty,
                fields.potentialBrightness,
                fields.topicName,
                topic_photo_file_name,
                fields.topicDescription,
                fields.profileName
            ]
            addIdea(res, values)
        }
    })
})

const addIdea = (res, values) => {
    db.query("CALL sp_create_idea(?, ?, ?, ?, ?, ?, ?, ?);", values, (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            console.log("create idea error")
            return res.status(500).json({
                msg: "Failure"
            })
        } else {
            return res.json({
                msg: "Success"
            })
        }
    })
}


router.get('/', (req, response) => {
    db.query("SELECT * FROM all_ideas_view;", (err, results) => afterAllIdeas(response, err, results))
})
const afterAllIdeas = (response, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        console.log("error after all ideas")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {

        var data = {
            ideas: results
        }
        db.query("SELECT * FROM latest_iterations_view;", (err, results) => afterLatestIterations(response, data, err, results))
    }
}

const afterLatestIterations = (response, data, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log("error afterLatestIterations")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        data.iterations = results
        db.query("SELECT * FROM average_potential_view;", (err, results) => 
            afterAveragePotentials(response, data, err, results))
    }
}

const afterAveragePotentials = (response, data, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log("error afterLatestIterations")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        data.potentials = results
        db.query("SELECT * FROM latest_comment_view;", (err, results) => 
            afterLatestComments(response, data, err, results))
    }
}

const afterLatestComments = async (response, data, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        return response.status(500).json({
            msg: "Failure afterLatestComments"
        })
    } else {
        console.log(results)
        var comments = results
        var full_ideas = []
        var index
        var ideas = data.ideas
        for (index = 0; index < ideas.length; index++) {
            let full_idea = {
                ...data.ideas[index],
                ...data.iterations[index],
                ...data.potentials[index],
                comments
            }
            full_ideas.push(full_idea)
        }
        const photos = await addPhotos(full_ideas)
        console.log(photos)
        return response.json({
            msg: "Success",
            ideas: full_ideas,
            photos
        })
    }
}

const addPhotos = async (full_ideas) => {
    // make a set to hold all unique file names
    var file_names = new Set() 
    for(let idea of full_ideas) {
        console.log(idea)
        file_names.add(idea.profile_photo_file_name)
        for(let comment of idea.comments) {
            file_names.add(comment.profile_photo_file_name)
        }
    }
    // make a dictionary mapping file names to photos
    var photos = {}
    for (let file_name of file_names) {
        const photo = await getPhoto(file_name)
        photos[file_name] = photo
    }
    return photos
}



// /api/idea/topic/:topic_id

router.get('/topic/:topic_id', (req, response) => {
    const topic_id = req.params.topic_id
    db.query("CALL sp_topic_ideas(?);", topic_id, (err, results) => afterTopicIdeas(response, topic_id, err, results))
})
const afterTopicIdeas = (response, topic_id, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        console.log("error afterTopicIdeas")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        var ideas = results[0]
        db.query("CALL sp_latest_topic_iterations(?);", topic_id, (err, results) => afterLatestTopicIterations(response, topic_id, ideas, err, results))
    }
}

const afterLatestTopicIterations = (response, topic_id, ideas, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        console.log("error afterLatestTopicIterations")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        const iterations = results[0]
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
        const comments = results[0]
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
