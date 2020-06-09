const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = require('./router')

require('dotenv').config()
const app = express()

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false})
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
app.use("/", router)

app.listen(3000)