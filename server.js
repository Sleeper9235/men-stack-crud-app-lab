const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.get('/planets', async (req, res) => {
    res.render('index.ejs')
})

app.get('/planets/new', async (req, res) => {
    res.render('./planets/new.ejs')
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
})