const express = require('express');
const router = express.Router();

router.get('/AvsB', (req, res) =>{
    res.render('mock-draft', {
        group1 : 'A',
        group2 : 'B'
    });
});

router.get('/AvsC', (req, res) =>{
    res.render('mock-draft', {
        group1 : 'A',
        group2 : 'C'
    });
});

router.get('/BvsC', (req, res) =>{
    res.render('mock-draft', {
        group1 : 'B',
        group2 : 'C'
    });
});

module.exports = router;