const mongoose = require('mongoose')


const CapsuleSchema = new mongoose.Schema({
    serial: String,
    type: String,
    waterLandings: Number
})

const Capsule = mongoose.model('Capsule', CapsuleSchema)

module.exports = Capsule