const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Planet = require('./models/planet.js')



app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const allPlanets = await Planet.find({})
    res.render('index.ejs', {
        Planets: allPlanets,
    })
})

app.get('/planets/new', async (req, res) => {
    const allPlanets = await Planet.find({})
    res.render('./planets/new.ejs', {
        Planets: allPlanets,
    })
})

app.post('/planets', async (req, res) => {
    if (req.body.planetIsHabitable === "on") {
        req.body.planetIsHabitable = true
    } else {
        req.body.planetIsHabitable = false
    }
    await Planet.create(req.body)
    console.log(req.body)
    res.redirect('/planets/new')
})

app.get('/planets/:id', async (req, res) => {
    const planetIndex = req.params.id
    const planets = await Planet.find({})
    res.render('planets/id.ejs', {
        planet: planets[planetIndex],
        planetIndex: planetIndex
    }) 
})

app.get('/planets/:id/edit', async (req, res) => {
    const planetIndex = req.params.id
    const planets = await Planet.find({})
    res.render('planets/edit.ejs', {
        planet: planets[planetIndex],
        planetIndex: planetIndex
    })
})

app.put('/planets/:id', async (req, res) => {

})



app.listen(3000, () => {
    console.log('Listening on port 3000')
})