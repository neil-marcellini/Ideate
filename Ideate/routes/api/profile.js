const express = require('express')
const router = express.Router()
const db = require('../../server')



// @route POST api/profile
// @desc Create new profile
// @access private

router.post('/', (req, res) => {
    //req.fields contains non-file fields 
    //req.files contains files 
    const fields = req.fields
    const file = req.files
    console.log(fields)
    console.log(file)
    res.send(JSON.stringify(req.fields));
})

module.exports = router
