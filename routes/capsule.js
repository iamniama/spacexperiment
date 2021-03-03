const express = require('express')
const db = require('../models')
const router = express.Router()
router.use(express.urlencoded({extended: false}))
const axios = require('axios')

router.get('/remote', async(req, res)=>{
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

router.get('/remote/:serial', async(req, res)=>{
    let capsuleData = []
    const response = await axios.post('https://api.spacexdata.com/v4/capsules/query', {query: {serial: req.params.serial}, options: {}})
    res.send(response.data)
})

router.get('/local', async(req, res)=>{
    const capsuleData = await db.Capsule.find({})
    res.send(capsuleData)
})

router.get('/local/:serial', async(req, res)=>{
    const capsuleData = await db.Capsule.findOne({serial: req.params.serial})
    res.send(capsuleData)
})

module.exports = router