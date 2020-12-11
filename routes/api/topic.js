const express = require('express')
const router = express.Router()
const db = require('../../server')

router.get('/', (req, res) => {
    db.query("SELECT * FROM topics_view;", (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure all topics"
            })
        } else {
            return res.json({
                msg: "All topics fetched.",
                topics: results
            })
        }
    })
})

module.exports = router