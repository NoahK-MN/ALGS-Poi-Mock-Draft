const express = require('express');
const router = express.Router();
const Draft = require('../models/draft');
router.get('/', async (req, res)=>{
    let user = req.user;
    if (!user){
        res.render('saved-drafts', {message: 'You must be signed in to view drafts', drafts: []});
        return;
    }
    const username = user.username; 
    try {
        const savedDrafts = await Draft.find({user: username});
        res.render('saved-drafts', {drafts: savedDrafts});
    } catch {
        res.sendStatus(404);
    }
}); 

router.post('/', async(req,res) =>{
    const username = req.body.username; 
    const groups = req.body.groups;
    const draftResults = req.body.teamArray;
    try {
        let draft = new Draft({user: username, groups, draftResults});
        await draft.save();
        res.sendStatus(200);
    } catch {
        res.sendStatus(400);
    }
});

router.get('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        let draft = await Draft.findById(id);
        if (!draft){
            res.sendStatus(404);
            return;
        } 
        const teams = draft.draftResults;
        res.render('view-draft', {teams});
    } catch {
        res.sendStatus(404);
    }
});


module.exports = router;