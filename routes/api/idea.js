const express = require('express')
const router = express.Router()
const db = require('../../db')
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs')
router.use(bodyParser.urlencoded({
    extended: true
}))
const s3 = require('../../s3.js')


var upload = multer({
    dest: 'temp/',
    limits: {fieldSize: 2000000}
})

router.post('/', upload.single('topicImage'), (req, res) => {
    const fields = req.body
    var topic_photo_file_name = null
    var values = [
        fields.ideaTitle,
        fields.ideaDescription,
        fields.potentialDifficulty,
        fields.potentialBrightness,
        fields.topicName,
        topic_photo_file_name,
        fields.topicDescription,
        fields.profileName
    ]
    topic_exists = fields.topicDescription === null || fields.topicDescription === "null"
    if (!topic_exists) {
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
                values = [
                    fields.ideaTitle,
                    fields.ideaDescription,
                    fields.potentialDifficulty,
                    fields.potentialBrightness,
                    fields.topicName,
                    topic_photo_file_name,
                    fields.topicDescription,
                    fields.profileName
                ]
                // Image uploaded, now add entry in db
                addIdea(res, values)
            }
        })
    }
    else {
        console.log("adding idea with existing topic")
        addIdea(res, values)
    }
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
    db.query("SELECT * FROM latest_iterations_view;", (err, results) => afterLatestIterations(response, err, results))
})

const afterLatestIterations = (response, err, results) => {
    if (err) {
        console.log(Object.keys(err))
        console.log("error afterLatestIterations")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        var data = {
            iterations: results
        }
        console.log("afterLatestIterations data = ", data)
        db.query("select * from total_iterations_view;", (err, results) => 
            afterTotalIterations(response, data, err, results))
    }
}

const afterTotalIterations = (response, data, err, results) => {
    if (err) {
        console.log(err)
        console.log("error afterTotalIterations")
        return response.status(500).json({
            msg: "Failure"
        })
    } else {
        data.total_iterations = results
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
        data.potentials.reverse()
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
        var iterations = data.iterations
        var iteration_comments
        var has_comment
        var comment_index = 0
        for (index = 0; index < iterations.length; index++) {
            const iteration = data.iterations[index]
            has_comment = comment_index < comments.length
            if (has_comment) {
                potential_comments = comments[comment_index]
                matches_iteration = potential_comments.iteration_id === iteration.iteration_id
                if (matches_iteration) {
                    iteration_comments = [potential_comments]
                    comment_index += 1
                }
                else {
                    iteration_comments = []
                }
            }
            else {
                iteration_comments = []
            }
            let full_idea = {
                ...data.iterations[index],
                ...data.total_iterations[index],
                ...data.potentials[index],
                comments: iteration_comments
            }
            full_ideas.push(full_idea)
        }
        
        db.query("select * from latest_iteration_comment_total;", (err, results) =>
            afterTotalComments(response, full_ideas, err, results))
    }
}

const afterTotalComments = (response, full_ideas, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        return response.status(500).json({
            msg: "Failure afterTotalComments"
        })
    } else {
        comment_totals = results
        console.log("afterTotalComments", comment_totals)
        var total_index = 0
        var has_total
        for (var idea_index = 0; idea_index < full_ideas.length; idea_index++) {
            var idea = full_ideas[idea_index]
            has_total = total_index < comment_totals.length
            idea.total_comments = 0
            if (has_total) {
                total_data = comment_totals[total_index]
                console.log(`total_data.iteration_id = ${total_data.iteration_id}`)
                console.log(`idea.iteration_id = ${idea.iteration_id}`)
                if (total_data.iteration_id === idea.iteration_id) {
                    idea.total_comments = total_data.total
                    total_index += 1
                }
            }
        }

        return response.json({
            msg: "Success",
            ideas: full_ideas,
        })
    }
}


module.exports = router
