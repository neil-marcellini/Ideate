const express = require('express')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config();
const cors = require('cors')  // allows/disallows cross-site communication

const jwt_secret_key = process.env.JWT_SECRET_KEY

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, './ideate_front/build');
app.use(express.static(buildPath));

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://pacific-mesa-86012.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

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


app.listen(PORT, () => console.log(`server started on port ${PORT}`))
