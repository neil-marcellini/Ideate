const express = require('express')
const router = express.Router()
const db = require('../../server')

router.post('/', (req, res) => {
    console.log("add comment backend")
    const data = req.body
    console.log(data)
    const values = Object.values(data)
    db.query("CALL sp_add_comment(?, ?, ?);", values, (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure addComment"
            })
        } else {
            const comment = results[0][0]
            // rename profile_name to comment_profile_name
            comment.comment_profile_name = comment.profile_name;
            delete comment.profile_name
            return res.json({
                msg: "Comment successfully added.",
                comment
            })
        }
    })
})

router.get('/iteration/:id', (req, res) => {
    console.log("iteration comments backend")
    const iteration_id = req.params.id
    console.log(iteration_id)
    db.query("CALL sp_iteration_comments(?);", iteration_id, (err, results) => {
        console.log("iteration comments")
        const comments = results[0]
        console.log(comments)
        return res.json({
            msg: "Iteration comments retreived",
            iteration_id,
            comments
        })
    })
})

module.exports = router