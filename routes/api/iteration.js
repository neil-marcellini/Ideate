const express = require('express')
const router = express.Router()
const db = require('../../db')

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

// get latest iteration for a given idea_id
router.get('/:idea_id/latest', (req, res) => {
    const idea_id = req.params.idea_id
    query = ` select * from Iteration
            where Iteration.idea_id = ?
            order by Iteration.iteration_num desc
            limit 1;`
    db.query(query, [idea_id], (err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure latest idea iteration"
            })
        } else {
            const iteration = results[0]
            console.log(iteration)
            return res.json({
                iteration
            })
        }
    })
})

module.exports = router
