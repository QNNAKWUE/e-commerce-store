const _ = require('lodash');
const { Product } = require('../models/products');
const fs = require('fs');


	module.exports = {
		createProduct: async (req, res) =>{
			let imgName = '';
			let {name, description, price, category, stock, sold, img } = req.body;

			if (img) {
				let rawFile = img.split(',');
          let extARE =rawFile[0].split('/');
          let extFinal =extARE[1].split(';');
          let ext = extFinal[0];
          let file = rawFile[1];
          if (ext === 'octet-stream') {
            ext = 'docx';
		  }
		  imgName = `queen_${Date.now()}.${ext}`
			let buff = new Buffer.from(file, 'base64');
			fs.writeFileSync(imgName, buff);
			
			}

			let product = new Product({name, description, price, category, stock, sold, photo:imgName });
			
			await product.save();
			res.send({name, description, price, category, stock, sold, photo:imgName });
			
		},


		deleteProduct: async (req, res) =>{
			let product = req.product;
		  product.remove((err, deleteProduct)=>{
			  if(err) {
				  return res.status(400).json({ error: 'failed to delete $ {product.name}' }); 
			  }
			   res.json({ message: '${product.name} deleted successfully', deleteProduct});
		  });
		},

		getAllProducts: async (req, res) =>{
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
		},

		getProductById: async (req, res) =>{
			const product = await Product.findById(req)
			.populate("category")
			.exec((err, product) =>{
				if(err) {
					return res.status(400).send("Product not found");
				}
				 res.send(product);
				next();
			});
		   
	 },
	 getAllUniqueCategories: (req, res) =>{
		Product.distinct("Category", {}, (err, product) =>{
			if (err) {
				return res.status(400).send("category not found");
			};
			res.send(category);
		});
	
	},
	

	updateProduct: async(req, res) =>{
		let imgName = '';
			let {name, description, price, category, stock, sold, img } = req.body;

			if (img) {
				let rawFile = img.split(',');
          let extARE =rawFile[0].split('/');
          let extFinal =extARE[1].split(';');
          let ext = extFinal[0];
          let file = rawFile[1];
          if (ext === 'octet-stream') {
            ext = 'docx';
		  }
		  imgName = `queen_${Date.now()}.${ext}`
			let buff = new Buffer.from(file, 'base64');
			fs.writeFileSync(imgName, buff);
			
			}

		const product = await Product.findById(id)
		.sort('name')
		.category('buff')
		.exec((product, err)=>{
			if (err){
				res.status(400).send('Could not update Product');
			}
			res.json({product});
		});
		
	},

}