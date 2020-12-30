const express = require('express')
const router = express.Router()
const db = require('../../db')

router.post('/', (req, res) => {
    const data = req.body
    const values = Object.values(data)
    db.query("CALL sp_add_comment(?, ?, ?);", values, (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure addComment"
            })
        } else {
            const comment = results[0][0]
            return res.json({
                msg: "Comment successfully added.",
                comment
            })
        }
    })
})

router.get('/iteration/:id', (req, res) => {
    const iteration_id = req.params.id
    db.query("CALL sp_iteration_comments(?);", iteration_id, (err, results) => {
        const comments = results[0]
        return res.json({
            msg: "Iteration comments retreived",
            iteration_id,
            comments
        })
    })
})

router.delete('/:comment_id', (req, res) => {
    const comment_id = req.params.comment_id
    const comment = req.body
    console.log("comment on delete backend", comment)
    const del_comment = "delete from Comment where Comment.comment_id = ?;"
    db.query(del_comment, comment_id, (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure deleting comment"
            })
        }
        else {
            return res.json({
                msg: "Comment successfully delted",
                comment
            })
        }
    })
})

module.exports = router
