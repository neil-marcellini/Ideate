const express = require('express')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config();


const jwt_secret_key = process.env.JWT_SECRET_KEY

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, './ideate_front/build')))
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, './ideate_front/build', 'index.html'));
    });
  }


// routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/idea', require('./routes/api/idea'))
app.use('/api/potential', require('./routes/api/potential'))
app.use('/api/comment', require('./routes/api/comment'))
app.use('/api/topic', require('./routes/api/topic'))
app.use('/api/iteration', require('./routes/api/iteration'))


app.use(morgan('combined'))


let port = process.env.PORT
if (port == null || port == ""){
    port = 5000;
}


app.listen(port, () => console.log(`server started on port ${port}`))
