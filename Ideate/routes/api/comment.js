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

module.exports = router