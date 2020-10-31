 const express = require ('express');
 const mongoose = require('mongoose');
 const config = require('config');
 const bodyParser = require('body-parser')
const path = require('path')
const stripe = require('stripe')(process.env.SECRETKEY)
 const auth = require('./routes/auth');
 const products = require('./routes/products');
 const users = require('./routes/users');
 const orders = require('./routes/orders');
 const category = require('./routes/category');
 const app = express();


// // if(!config.get('jwtPrivateKey')){
// //     console.log("FATAL ERROR: jwtPrivateKey is not defined");
// //     process.exit(1);
// // }

mongoose.connect('mongodb://localhost/store')
    .then(()=>console.log('Connected to Mongodb...'))
         .catch(err => console.error('Could not connect to Mongodb...', err));


 app.use(express.json());
 app.use('/api/users', users);
 app.use('/api/auth', auth);
 app.use('/api/products', products);
 app.use('/api/orders', orders);
 app.use('/api/category', category);

 app.use(bodyParser.urlencoded({ extended: true }))

 app.set('view engine', 'ejs');
 app.engine('html', require('ejs').renderFile);
 
 app.use(express.static(path.join(__dirname, './views')));
 
 app.post('/charge', (req, res) => {
     try {
         stripe.customers.create({
             name: req.body.name,
             email: req.body.email,
             source: req.body.stripeToken
         }).then(customer => stripe.charges.create({
             amount: req.body.amount * 100,
             currency: 'usd',
             customer: customer.id,
             description: 'Thank you for your generous donation.'
         })).then(() => res.render('complete.html'))
             .catch(err => console.log(err))
     } catch (err) { res.send(err) }
 })
 
 
 const port = process.env.PORT || 8000
 app.listen(port, () => console.log('Server is running...'))


