const express = require('express')
const axios = require('axios')
const db = require('./models')

const app = express()
app.use(express.urlencoded({extended: false}))
const PORT = process.env.port || 3333



app.get('/', (req, res)=>{
    res.send("Welcome to my Space-X API implementation")
})

app.get('/fetch-capsules-remote', async(req, res)=>{
    let capsuleData = []
    const response = await axios.get('https://api.spacexdata.com/v4/capsules')
    for (let capsule of response.data){
        capsuleData.push({
            serial: capsule.serial,
            type: capsule.type,
            waterLandings: capsule.water_landings
        })
    }
    const docs = await db.Capsule.insertMany(capsuleData)
    res.send(docs)


})

app.get('/fetch-capsules-remote/:serial', async(req, res)=>{
    let capsuleData = []
    const response = await axios.post('https://api.spacexdata.com/v4/capsules/query', {query: {serial: req.params.serial}, options: {}})
    res.send(response.data)
})

app.get('/fetch-capsules-local', async(req, res)=>{
    const capsuleData = await db.Capsule.find({})
    res.send(capsuleData)
})

app.get('/fetch-capsules-local/:serial', async(req, res)=>{
    const capsuleData = await db.Capsule.findOne({serial: req.params.serial})
    res.send(capsuleData)
})

app.get('/fetch-launches-remote', async (req, res) => {
    const launchData = await axios.get('https://api.spacexdata.com/v4/launches')
    let returnJSON = []
    for (let data of launchData.data) {
        returnJSON.push(
            {
                name: data.name,
                flight_number: data.flight_number,
                date_local: data.date_local
            }
        )
    }
    const launches = await db.Launch.insertMany(returnJSON)
    res.json(launches)
})

app.get('/fetch-launches-local', async(req,res)=>{
    const launchData = await db.Launch.find({})
    res.send(launchData)
})

app.get('/fetch-landpads-local', async(req,res)=>{
    const padData = await db.Landpad.find({})
    res.send(padData)
})


app.get('/fetch-landpads-remote', async (req, res) => {
    const padData = await axios.get('https://api.spacexdata.com/v4/landpads')
    let returnJSON = []
    for (let data of padData.data) {
        returnJSON.push(
            {
            name: data.name,
            full_name: data.full_name,
            location: data.locality,
            details: data.details
            }
        )
    }
    const landpads = await db.Landpad.insertMany(returnJSON)
    res.json(landpads)
})



const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

