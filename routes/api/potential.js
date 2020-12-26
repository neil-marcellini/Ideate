const express = require('express')
const router = express.Router()
const db = require('../../db')

router.post('/', (req, res) => {
    const data = req.body
    const iteration_id = data.iteration_id
    const values = Object.values(data)
    db.query("CALL sp_rating(?, ?, ?, ?);", values, (err, results) => afterRating(res, iteration_id, err, results))
})

const afterRating = (res, iteration_id, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        return res.status(500).json({
            msg: "Failure afterRating"
        })
    } else {
        db.query("CALL sp_average_potential(?);", iteration_id, (err, results) => newAveragePotential(res, iteration_id, err, results))
    }
}

const newAveragePotential = (res, iteration_id, err, results) => {
    if (err) {
        console.log(err.sqlMessage)
        return res.status(500).json({
            msg: "Failure newAveragePotential"
        })
    } else {
        const potential_row = results[0]
        const potential_data = potential_row[0]
        return res.json({
            iteration_id,
            potential_difficulty: potential_data.potential_difficulty,
            potential_brightness: potential_data.potential_brightness
        })
    }
}

module.exports = router
