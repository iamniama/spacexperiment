const mongoose = require('mongoose')


const LaunchSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    flight_number: Number,
    date_local: String
})

const Launch = mongoose.model('Launch', LaunchSchema)

module.exports = Launch