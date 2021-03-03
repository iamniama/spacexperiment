const mongoose = require('mongoose')


const ShipSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    type: String,
    roles: [String],
    home_port: String,
    year_built: Number,
    image: String,
    link: String
})

const Ship = mongoose.model('Ship', ShipSchema)

module.exports = Ship