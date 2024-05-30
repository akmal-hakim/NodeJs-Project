const path = require('path');
const express = require('express');
const morgan = require('morgan');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



// Serving Static Files
//app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
app.use('/', viewRouter);

app.get('/overview', (req,res) =>{
    res.status(200).render('overview', {
        title: 'All Tours'
    });
});

/*
app.get('/', (req,res) =>{
    res.status(200).render('base');
})
*/
//---------------------------------------------


const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json()); 

app.use((req, res, next) => {
    console.log('Hello from the middleware ');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/api/v1/tours', tourRouter); 
app.use('/api/v1/users', userRouter);

module.exports = app;


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



//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------

