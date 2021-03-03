const express = require('express')
const axios = require('axios')
const db = require('./models')

const app = express()
app.use(express.urlencoded({extended: false}))
const PORT = process.env.port || 3333



app.get('/', (req, res)=>{
    res.send("Welcome to my Space-X API implementation")
})

app.get('/v1/fetch-capsules-remote', async(req, res)=>{
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

app.get('/v1/fetch-capsules-remote/:serial', async(req, res)=>{
    let capsuleData = []
    const response = await axios.post('https://api.spacexdata.com/v4/capsules/query', {query: {serial: req.params.serial}, options: {}})
    res.send(response.data)
})

app.get('/v1/fetch-capsules-local', async(req, res)=>{
    const capsuleData = await db.Capsule.find({})
    res.send(capsuleData)
})

app.get('/v1/fetch-capsules-local/:serial', async(req, res)=>{
    const capsuleData = await db.Capsule.findOne({serial: req.params.serial})
    res.send(capsuleData)
})

app.get('/v1/fetch-launches-remote', async (req, res) => {
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

app.get('/v1/fetch-launches-local', async(req,res)=>{
    const launchData = await db.Launch.find({})
    res.send(launchData)
})

app.get('/v1/fetch-landpads-local', async(req,res)=>{
    const padData = await db.Landpad.find({})
    res.send(padData)
})


app.get('/v1/fetch-landpads-remote', async (req, res) => {
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

app.get('/v1/fetch-ships-remote', async(req,res)=>{
    const shipData = await axios.get('https://api.spacexdata.com/v4/ships')
    let shipJSON = []
    for (let data of shipData.data){
        shipJSON.push(
            {
                name: data.name,
                type: data.type,
                roles: [...data.roles],
                home_port: data.home_port,
                year_built: data.year_built,
                image: data.image,
                link: data.link,
                active: data.active
            }
        )
    }
    const ships = await db.Ship.insertMany(shipJSON)
    res.json(ships)
})

app.get('/v1/fetch-active-ships-remote', async(req,res)=>{
    const shipData = await axios.post('https://api.spacexdata.com/v4/ships/query', {query: {active: true}, options: {}})
    res.json(shipData.data)
})

app.get('/v1/fetch-active-ships-local', async(req,res)=>{
    const shipData = await db.Ship.find({active:true})
    res.json(shipData)
})

app.get('/v1/fetch-ships-local', async(req,res)=>{
    const shipData = await db.Ship.find({})
    res.send(shipData)
})



const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

