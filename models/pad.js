const mongoose = require('mongoose')


const PadSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    full_name: String,
    location: String,
    details: String
})

const Landpad = mongoose.model('Landpad', PadSchema)

module.exports = Landpad