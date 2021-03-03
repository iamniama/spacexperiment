const express = require('express')
const db = require('../models')
const router = express.Router()
router.use(express.urlencoded({extended: false}))
const axios = require('axios')


router.get('/local', async(req,res)=>{
    const padData = await db.Landpad.find({})
    res.send(padData)
})


router.get('/remote', async (req, res) => {
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

module.exports = router



