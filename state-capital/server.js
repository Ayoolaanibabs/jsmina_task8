const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');

app.use(logger);

app.get('/', (req, res)=>{
    res.send('Home Page');
});

app.get('/users', auth, (req, res)=>{
    res.send('Users Page');
});

app.post('/', (req, res, next)=>{
    const product = {
        name: req.body.name,
        price: req.body.proice
    };
    res.status(201).json({
        message: 'Handling POST requests',
        createdProduct: product
    })
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use ((error, req,res , next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})
function logger(req, res, next){
    console.log('log')
    next()
};
function auth(req, res, next){
    if (req.query.admin === 'true'){
        next()
        return 
    }
        res.send('NO AUTH')
    
};

app.listen(3000);