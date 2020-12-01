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
            return res.json({
                msg: "Comment successfully added.",
                ...data
            })
        }
    })
})

module.exports = router