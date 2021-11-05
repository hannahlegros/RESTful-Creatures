const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware
// makes req.body work
app.use(express.urlencoded({extended: false}))
// bypasses HTML to reroute a POST method to a DELETE method
app.use(methodOverride('_method'))

// controllers middleware (must go under body-parser)
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.listen(8000, ()=>{
    console.log('Hellooooo Dinos 🦖')
})