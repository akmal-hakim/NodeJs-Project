const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);

//router.get('/tour', viewsController.getTour);
/*
app.get('/', (req,res) =>{
    res.status(200).render('base');
})
*/

module.exports = router;