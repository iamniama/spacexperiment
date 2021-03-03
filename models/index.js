const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gaSpaceX', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection

db.once('open', ()=>{
    console.log(`Connected to MongoDB at ${db.host}`)
})

db.on('error', (error)=>{
    console.log(`********SOMETHING'S WRONG********`)
    console.log(error)
    console.log(`********/SOMETHING'S WRONG********`)
})

module.exports = {
    Capsule: require('./capsule'),
    Landpad: require('./pad'),
    Launch: require('./launch'),
    Ship: require('./ship')
}