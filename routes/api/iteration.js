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
            return res.json({
                iteration
            })
        }
    })
})

// api/iteration/:idea_id/:iteration_num
// get all the iteration data for a given idea_id and iteration_num
router.get('/:idea_id/:iteration_num', (req, res) => {
    const idea_id = req.params.idea_id
    const iteration_num = req.params.iteration_num
    db.query("call sp_next_iteration(?, ?);", [idea_id, iteration_num], (err, results) => {
        afterNextIteration(res, err, results)
    })
})

const afterNextIteration = (res, err, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure nextIteration"
            })
        } else {
            const iteration = results[0][0]
            let iteration_id = iteration.iteration_id
            latest_comment_query = `
                select *
                from Comment
                where Comment.iteration_id = ?
                order by Comment.comment_creation desc
                limit 1;
            `
            db.query(latest_comment_query, [iteration_id], (err, results) => {
                afterLatestIterComment(res, err, iteration, results)
            })
        }
}

const afterLatestIterComment = (res, err, iteration, results) => {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(500).json({
                msg: "Failure afterLatestIterComment"
            })
        } else {
            console.log("afterLatestIterComment", results)
            let has_comments = results.length > 0
            var comments = []
            if (has_comments) {
                comments.push(results[0])
            }
            iteration.comments = comments
            return res.json({
                iteration
            })
        }
}

module.exports = router
