const express = require('express')
const axios = require('axios')
const db = require('./models')

const app = express()
app.use(express.urlencoded({extended: false}))
const PORT = process.env.port || 3333






app.get('/v1', (req, res)=>{
    res.send("Welcome to my Space-X API implementation")
})

app.use('/v1/capsules', require('./routes/capsule'))
app.use('/v1/launches', require('./routes/launch'))
app.use('/v1/landpads', require('./routes/landpad'))
app.use('/v1/ships', require('./routes/ship'))







const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

