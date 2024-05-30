const fs = require('fs');
const express = require('express');

const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json()); 

app.use((req, res, next) => {
    console.log('Hello from the middleware ');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

/* 
----------------------------------------------------------------------------------------🥸
    🤓if not using this package app.use(express.json()); , it will not take any json files
    
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

Change all of it to this ---------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
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

const createTours = (req, res) => {
    const newId = tours[tours.length - 1].id + 1; 
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), 
        err => {
        res.status(201).json({ 
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length){
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
};

const deleteTour = (req, res) => {
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
};

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTours);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

but can also do it in this way, much better option

app 
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTours);

app
    .route(/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

In chapter 57 We Write like this 

----------------------------------------------------------------------------------------
*/

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


const getAllTours = (req, res) => {
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
const getTour = (req, res) => {
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
const createTours = (req, res) => {
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

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length){
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
};

const deleteTour = (req, res) => {
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
};

//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------

const tourRouter = express.Router();

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTours);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app.use('/api/v1/tours', tourRouter); 

/*
    app.use('/api/v1/tours', tourRouter);  must be below the variable 
    cannot above the variable 


*/

//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use('/api/v1/users', userRouter);


//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});