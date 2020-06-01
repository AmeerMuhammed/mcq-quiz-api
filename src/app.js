const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')

require('dotenv').config()
const app = express()

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true})
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", router)

app.listen(3000)