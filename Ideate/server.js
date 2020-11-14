const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const app = express()

app.use(morgan('combined'))

const port = 5000;

function createConnection() {
    const connection = mysql.createConnection({
        host: "ec2-54-197-115-206.compute-1.amazonaws.com",
        user: "root",
        password: "comp420",
        database: 'ideate'
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