const express = require('express')
const router = express.Router()
const db = require('../../server')
const jwt = require('jsonwebtoken')
const jwt_secret_key = process.env.JWT_SECRET_KEY
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

// @route POST api/users
// @desc Signup new user
// @access Public

router.post('/', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({msg: "Please enter all fields"})
    }

    // check for existing user
    db.query("SELECT * FROM User WHERE user_email=?;", email, (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({msg: "User already exists"})
        } else {
            // add user
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err) {
                    console.log(`error with bcrypt hash: ${err}`)
                }
                const user_id = uuidv4()
                db.query(
                    "INSERT INTO User VALUES (?, ?, ?);",
                    [user_id, email, hash],
                    (err, result) => {
                        const token = jwt.sign({user_id}, jwt_secret_key, {
                            expiresIn: "5 days",
                        })
                        // send back user
                        res.json({
                            token,
                            user: {
                                user_id,
                                email
                            }
                        })
                    }
                )
            });

        }
    })

})
module.exports = router
