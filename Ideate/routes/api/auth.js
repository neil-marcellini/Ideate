const express = require('express')
const router = express.Router()
const db = require('../../server')
const auth = require('../../middleware/auth')


// @route POST api/auth
// @desc Authenticate user
// @access Public

router.post('/', (req, res) => {
    const { email, password } = req.body

    // check for existing user
    db.query("SELECT * FROM User WHERE user_email=?;", email, (err, result) => {
        if (!result) {
            return res.status(400).json({msg: "Incorrect user email"})
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
                    // send back user
                    res.json({
                        token,
                        user: {
                            user_id,
                            email
                        }
                    })
                    
                } else {
                    res.status(400).json({msg: "Invalid credentials."})
                }
            });
        }
    })

})

// @route GET api/auth/user
// @desc GET user data
// @access Private

router.get('/user', auth, (req, res) => {
    // find user by id
    db.query("SELECT user_id, user_email FROM User WHERE user_id=?;", req.user.user_id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result[0])
    })
})

module.exports = router
