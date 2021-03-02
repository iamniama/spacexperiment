const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({extended: false}))
const PORT = process.env.port || 3333

axios.get('https://api.spacexdata.com/v4/capsules')
    .then((response)=>{
        console.log(response.data[0])
    })

app.get('/', (req, res)=>{
    res.send("Welcome to my Space-X API implementation")
})



const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})

