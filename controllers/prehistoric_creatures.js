const express = require('express')
const router = express.Router()
const fs = require('fs')

// Index route
router.get('/', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(prehistoricCreatures)
    // filter 
    let typeFilter = req.query.typeFilter
    if(typeFilter){
        creatureData = creatureData.filter((creature)=>{
            return creature.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/index.ejs', {creatureData: creatureData})
})
// new route
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new.ejs')
})
// get update form
router.get('/edit/:idx', (req, res)=>{
    // get creatures from array
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/edit.ejs', {creatureId: req.params.idx, creature: creatureData[req.params.idx]})
})
// update a creature
router.put('/:idx', (req, res)=>{
    // get creatures from array
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // re-assign type and img for the creature being edited
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url
    // save edits to JSON file
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})
// show route
router.get('/:idx', (req, res)=>{
    // get PHC array
    let prehistoricCreatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(prehistoricCreatures)
    // get array index from URL parameter
    let creatureIndex = req.params.idx
    res.render('prehistoric_creatures/show.ejs', {myCreature: creatureData[creatureIndex]})
})

// post a new PHC route
router.post('/', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(prehistoricCreatures)
    // add new creature to creatureData
    creatureData.push(req.body)
    // save updated array to JSON
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})
// delete a PHC from array
router.delete('/:idx', (req, res)=>{
    // get creatures from array
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // remove deleted creature from array
    creatureData.splice(req.params.idx, 1)
    // save new array to JSON 
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router