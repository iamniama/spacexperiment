const mongoose = require('mongoose')


const CapsuleSchema = new mongoose.Schema({
    serial: {type: String, unique: true, required: true},
    type: String,
    waterLandings: Number
})

const Capsule = mongoose.model('Capsule', CapsuleSchema)

module.exports = Capsule