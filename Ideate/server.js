const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
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
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/idea', require('./routes/api/idea'))
app.use('/api/potential', require('./routes/api/potential'))
app.use('/api/comment', require('./routes/api/comment'))
app.use('/api/topic', require('./routes/api/topic'))


app.use(morgan('combined'))

const port = 5000;



app.get('/user', (req, res) => {
    db.query("SELECT * FROM User", (err, rows, fields) => {
        console.log("fetched users successfully")
        res.json(rows)
    })
})

app.listen(port, () => console.log(`server started on port ${port}`))