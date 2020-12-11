const express = require('express')
const router = express.Router()
const db = require('../../server')

router.post('/', (req, res) => {
    console.log("new iteration backend")
    console.log(req.body)
    const data = req.body
    const values = Object.values(data)
    db.query("CALL sp_new_iteration(?, ?, ?, ?, ?);", values, (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure new_iteration"
            })
        } else {
            const iteration = results[0][0]
            return res.json({
                msg: "iteration successfully added.",
                iteration
            })
        }
    })
})

module.exports = router