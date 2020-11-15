const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const { restart } = require('nodemon');
require('dotenv').config();
const jwt_secret_key = process.env.JWT_SECRET_KEY


const app = express()
app.use(express.json())

app.use(morgan('combined'))

const port = 5000;

function createConnection() {
    const db_config = require("./db_config.json")
    const connection = mysql.createConnection({
        host: db_config.host,
        user: db_config.user,
        password: db_config.password,
        database: db_config.database
    })
    return connection
}
const db = createConnection()

app.post("/api/signup", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query(
            "INSERT INTO User VALUES (?, ?, ?);",
            [uuidv4(), email, hash],
            (err, result) => {
                console.log(err)
            }
        )
    });
})

app.post("/api/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // get user info from db
    // find user by email. load their hash and compare
    db.query(
        "SELECT * FROM User WHERE user_email=?;",
        email,
        (err, result) => {
            if (err) {
                res.send({err})
            } else {
                user_data = result[0]
                const hash = user_data.user_password_hash
                bcrypt.compare(password, hash, function(err, auth_res) {
                    if (auth_res) {
                        // user verified
                        const user_id = user_data.user_id
                        const token = jwt.sign({user_id}, jwt_secret_key, {
                            expiresIn: "5 days",
                        })
                        res.json({
                            authorized: true,
                            token,
                            user_id
                        })
                    } else {
                        console.log(err)
                    }
                });
            }
        }
    )
})




app.get('/user', (req, res) => {
    db.query("SELECT * FROM User", (err, rows, fields) => {
        console.log("fetched users successfully")
        res.json(rows)
    })
})

app.listen(port, () => console.log(`server started on port ${port}`))