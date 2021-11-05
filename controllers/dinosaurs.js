const express = require('express')
const router = express.Router()
const fs = require('fs')

// Index route
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index.ejs', {dinoData: dinoData})
})
// new route
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})
// get update form
router.get('/edit/:idx', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})
// update a dino
router.put('/:idx', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // re-assign the name and type fields to the dino to be edited
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // save the edited dinos to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})
// show route
router.get('/:idx', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // get array index from URL parameter
    let dinoIndex = req.params.idx
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// Post a new dino route
router.post('/', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) //took info from JSON and turned into array
    // add new dino to dinoData
    dinoData.push(req.body)
    // save the updated dinoData to JSON
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData)) //returning data to JSON
    // redirect to GET /dinosaurs (index)
    res.redirect('/dinosaurs')
})

// Delete a dino from the array
router.delete('/:idx', (req, res)=>{
  // get dinosaurs array
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs) //took info from JSON and turned into array
  
    //remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)
    
    // save the new dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData)) //returning data to JSON
    res.redirect('/dinosaurs')
})


module.exports = router