const express = require('express')
const router = express.Router()
const db = require('../../db')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const jwt_secret_key = process.env.JWT_SECRET_KEY
const bcrypt = require('bcrypt');


// @route POST api/auth
// @desc Authenticate user
// @access Public

router.post('/', (req, res) => {
    console.log("received auth request")
    const { email, password } = req.body

    // check for existing user
    db.query("SELECT * FROM User WHERE user_email=?;", email, (err, result) => {
        if(err) {
            console.log(err)
        }
        console.log(result)
        if (result.length == 0) {
            return res.status(400).json({field: "email", msg: "Incorrect user email"})
        } else {
            // validate password
            user_data = result[0]
            const hash = user_data.user_password_hash
            bcrypt.compare(password, hash, function(err, auth_res) {
                if (auth_res) {
                    // user verified
                    const user_id = user_data.user_id
                    const token = jwt.sign({user_id}, jwt_secret_key, {
                        expiresIn: "5 days",
                    })
                    user_data = {
                        token,
                        user: {
                            user_id,
                            email
                        }
                    }
                    getProfileName(res, user_data) 
                } else {
                    res.status(400).json({field: "password", msg: "Invalid credentials."})
                }
            });
        }
    })

})

const getProfileName = (res, user_data) => {
    const user = user_data.user
    // given a user find their profile name if one exists
    profile_query = "select profile_name from Profile where user_id = ?;"
    db.query(profile_query, user.user_id, (err, results) => {
        if(err) {
            console.log(err)
            return res.status(400)
        }
        else {
            var profile_name = null
            if (results.length > 0) {
                profile_name = results[0].profile_name
            }
            // send back user
            res.json({
                ...user_data,
                profile_name
            })
        }
    })
}

// @route GET api/auth/user
// @desc GET user data
// @access Private

router.get('/user', auth, (req, res) => {
    // find user by id
    db.query("SELECT user_id, user_email FROM User WHERE user_id=?;", req.user.user_id, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(401)
        }
        return res.json(result[0])
    })
})

module.exports = router
