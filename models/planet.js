const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
    name: String,
    type: String,
    size: String,
    planetIsHabitable: Boolean,
})

const Planet = mongoose.model('Planet', planetSchema)

module.exports = Planet