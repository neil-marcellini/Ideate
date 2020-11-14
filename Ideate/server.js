const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const app = express()

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
const connection = createConnection()

app.get('/user', (req, res) => {
    connection.query("SELECT * FROM User", (err, rows, fields) => {
        console.log("fetched users successfully")
        res.json(rows)
    })
})

app.listen(port, () => console.log(`server started on port ${port}`))