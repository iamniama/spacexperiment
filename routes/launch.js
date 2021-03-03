const express = require('express')
const db = require('../models')
const router = express.Router()
router.use(express.urlencoded({extended: false}))
const axios = require('axios')



router.get('/remote', async (req, res) => {
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

router.get('/local', async(req,res)=>{
        const launchData = await db.Launch.find({})
        res.send(launchData)
})

module.exports = router