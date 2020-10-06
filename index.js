const express = require ('express');
const mongoose = require('mongoose');
const config = require('config');
const auth = require('./routes/auth');
const products = require('./routes/products');
const users = require('./routes/users');
const app = express();


// if(!config.get('jwtPrivateKey')){
//     console.log("FATAL ERROR: jwtPrivateKey is not defined");
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/store')
    .then(()=>console.log('Connected to Mongodb...'))
    .catch(err => console.error('Could not connect to Mongodb...', err));


app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/products', products);




app.listen(8000, () => {
    console.log("Listening on port 8000");
});