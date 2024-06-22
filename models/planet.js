const mongoose = require('mongoose')


const planetSchema = new mongoose.Schema({
    name: String,
    planetType: String,
    size: Number,
    planetIsHabitable: Boolean,
})

const Planet = mongoose.model('Planet', planetSchema)

module.exports = Planet