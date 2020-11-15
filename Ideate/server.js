const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

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
            "INSERT INTO User VALUES (?, ?, ?)",
            [uuidv4(), email, hash],
            (err, result) => {
                console.log(err)
            }
        )
    });
})



app.get('/user', (req, res) => {
    db.query("SELECT * FROM User", (err, rows, fields) => {
        console.log("fetched users successfully")
        res.json(rows)
    })
})

app.listen(port, () => console.log(`server started on port ${port}`))