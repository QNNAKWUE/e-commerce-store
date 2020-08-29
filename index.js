const express = require ('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const products = require('./routes/products');
const app = express();

//const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/store')
    .then(()=>console.log('Connected to Mongodb...'))
    .catch(err => console.error('Could not connect to Mongodb...', err));


app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('api/products', products);


app.listen(8000, () => {
    console.log("Listening on port 8000");
});