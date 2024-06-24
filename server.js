const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Planet = require('./models/planet.js')


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

//GET /
app.get('/', async (req, res) => {
    const allPlanets = await Planet.find({})
    res.render('index.ejs', {
        Planets: allPlanets,
    })
})
// GET /planets/new
app.get('/planets/new', async (req, res) => {
    const allPlanets = await Planet.find({})
    res.render('./planets/new.ejs', {
        Planets: allPlanets,
    })
})

app.get('/planets/:id', async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.id)
    res.render('planets/id.ejs', {
        planet: foundPlanet,
    }) 
})

app.get('/planets/:id/edit', async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.id)
    res.render('planets/edit.ejs', {
        planet: foundPlanet
    })
})

app.put('/planets/:id', async (req, res) => {
    if (req.body.planetIsHabitable === "on") {
        req.body.planetIsHabitable = true
    } else {
        req.body.planetIsHabitable = false
    } 
    await Planet.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')
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

app.delete('/planets/:id', async (req, res) => {
    await Planet.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})