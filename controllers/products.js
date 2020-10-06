const express = require('express');
const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' }); 
const _ = require('lodash');
const { Product } = require('../models/products');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

exports.file = ('/uploadfile', upload.single('myfile'), (req, res, next) => {
    const file = req.file;
    if(!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});


	  exports.deleteProduct = (async (req, res) =>{
		  let product = req.product;
		  product.remove((err, deleteProduct)=>{
			  if(err) {
				  return res.status(400).json({ error: 'failed to delete $ {product.name}' }); 
			  }
			   res.json({ message: '${product.name} deleted successfully', deleteProduct});
		  });
	  });

	  exports.getAllProducts = (async (req, res)=>{
		 const products = await Product.find()
		 .sort('name')
		 .limit()
		 .populate("category")
		 .select("photo")
		 .exec((err, products)=>{
		 	if (err || !products) {
		 		return res.status(400).send("Product not found");
		 	}
		 	res.send(products);
		 });
		return res.json({data:{}, message:'succesful'})
	});

		exports.getProductById = (async (req, res) =>{
			 const product = await Product.findById(req)
			 .populate("category")
			 .exec((err, product) =>{
			 	if(err) {
			 		return res.status(400).send("Product not found");
			 	}
			 	 res.send(product);
			     next();
			 });
			
	  });

	    /*exports.updateProduct = (async (req, res) =>{
		  let form = formidable.IncomingForm();
		  form.keepExtensions = true;

		  form.parse(req, (err, fields, file)=>{
			  if(err){
				  return res.status(400).send("Saving to DB failed");
			  }

			  let product = req.product;
			  product = _.extend(product, fields);

			  if(file.size > 3000000){
				  return res.status(400).send('file size too large');
			  }

			  product.photo.data = fs.readFileSync(product.photo.path);
			  product.photo.contentType = file.photo.type;

			   product.save(err, product);
			  if(err) {
				  return res.status(400).send("Failed to save to DB");
			  };
			  res.send(product);

		  });*/

		  exports.getAllUniqueCategories = (req, res) =>{
			Product.distinct("Category", {}, (err, product) =>{
				if (err) {
					return res.status(400).send("category not found");
				};
				res.send(category);
			});
		  };

		


