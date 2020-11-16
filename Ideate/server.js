const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const { restart } = require('nodemon');
require('dotenv').config();

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

module.exports = db

const jwt_secret_key = process.env.JWT_SECRET_KEY

const app = express()
app.use(express.json())

// user routes
app.use('/api/users', require('./routes/api/users'))
app.use('api/auth', require('./routes/api/auth'))

app.use(morgan('combined'))

const port = 5000;



app.get('/user', (req, res) => {
    db.query("SELECT * FROM User", (err, rows, fields) => {
        console.log("fetched users successfully")
        res.json(rows)
    })
})

app.listen(port, () => console.log(`server started on port ${port}`))