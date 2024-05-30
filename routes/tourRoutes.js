const express = require('express');
const tourController = require('./../controllers/tourController');
// const {getAllTours , } = require('./../controllers/tourController'); can also written like this

const router = express.Router();

router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTours);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;