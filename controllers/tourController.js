const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) =>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

/* 
    Can write like this 
    /api/v1/tours/:id/:x/:y
    /api/v1/tours/:id/:x/:y?
*/
exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    // if (id > tours.length){
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

// Please read the same emoji to this 🤓
exports.createTours = (req, res) => {
    //console.log(req.body);

    const newId = tours[tours.length - 1].id + 1; // use for creating new id 
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), 
        err => {
        res.status(201).json({ //200 stands for okei and 201 which means created
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

exports.updateTour = (req, res) => {
   
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here ...>'
        }
    });
};

exports.deleteTour = (req, res) => { 
    res.status(204).json({ //204 means no content 
        status: 'success',
        data: null
    });
};