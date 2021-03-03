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



const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

