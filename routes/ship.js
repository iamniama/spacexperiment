const express = require('express')
const db = require('../models')
const router = express.Router()
router.use(express.urlencoded({extended: false}))
const axios = require('axios')


router.get('/remote', async(req,res)=>{
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

router.get('/remote/active', async(req,res)=>{
    const shipData = await axios.post('https://api.spacexdata.com/v4/ships/query', {query: {active: true}, options: {}})
    res.json(shipData.data)
})

router.get('/local/active', async(req,res)=>{
    const shipData = await db.Ship.find({active:true})
    res.json(shipData)
})

router.get('/local', async(req,res)=>{
    const shipData = await db.Ship.find({})
    res.send(shipData)
})


module.exports = router