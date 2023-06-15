require('dotenv').config()
const express = require('express')
require('./config/database.js')
const passport = require('passport')
const Router = require('./routes/routes') 
const app = express()

app.use(express.json())
app.use('/api', Router)

app.use(passport.initialize())

app.listen(4000, () => {console.log('Server conected port 4000')})