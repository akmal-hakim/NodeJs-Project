const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); 
/* 
----------------------------------------------------------------------------------------🥸
    🤓if not using this package app.use(express.json()); , it not take any json files
    
    {
    "name": "Test Tours",
    "duration": 120,
    "difficulty": "easy"
    }

    this files
----------------------------------------------------------------------------------------
*/


/*
----------------------------------------------------------------------------------------
app.get('/', (req,res) => {
    res
        .status(200)
        .json({message: "Hello from the server side!", app:"Natours"});

});

app.post('/', (req,res) => {
    res.send('You can post to this endpoint...');
});
----------------------------------------------------------------------------------------
*/

/*
----------------------------------------------------------------------------------------
🥸 Video 57

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.get('/api/v1/tours', getAllTours);

Change all of it 
app.get('/api/v1/tours/:id' , getTour);
app.patch('/api/v1/tours/:id' , updateTour);

but can also use this way, much better

app 
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTours);

app
    .route(/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

----------------------------------------------------------------------------------------
*/


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

/* 
    Can write like this 
    /api/v1/tours/:id/:x/:y
    /api/v1/tours/:id/:x/:y?
*/
app.get('/api/v1/tours/:id', (req, res) => {
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
});

// Please read the same emoji to this 🤓
app.post('/api/v1/tours', (req, res) => {
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
})

app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length){
    //if (id > tours.length){
    //if(!tour) { not gonna use tour cause we dont have tour
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
        
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here ...>'
        }
    });
});

app.delete('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
        
    res.status(204).json({ //204 means no content 
        status: 'success',
        data: null
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});