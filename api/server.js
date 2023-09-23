// Access-Control-Allow-Origin:  http://localhost:8080

// Access-Control-Allow-Credentials: true

// Access-Control-Allow-Methods: POST, PUT, PATCH, GET, DELETE, OPTIONS

// Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization

const express = require('express')
const mongoose = require('mongoose')
const morgan =  require('morgan')
const bodyParser = require('body-parser')

const Product = require('./routes/product')
const AuthRoute = require('./routes/auth')
const Suggest = require('./routes/suggest')
const TypePoster = require('./routes/typeposter')
const Division = require('./routes/division')
const Orders = require('./routes/orders')

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connection established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/api/typeposter', TypePoster)
app.use('/api/suggestions', Suggest)
app.use('/api/product', Product)
app.use('/api', AuthRoute)
app.use('/api/division', Division)
app.use('/api/orders', Orders)