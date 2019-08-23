const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const {name, description, price, category, quantity, shipping} = fields;

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "all the fields must be added"
            })
        }

        let product = new Product(fields);

        if (files.photo) {
            // console.log(files.photo);
            if(files.photo.size > 5000000){
                return res.status(400).json({
                    error: 'Image should be less than 5 MBs'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if(error || !product){
            return res.status(400).json({
                  error: "Product not found"  
            })
        }
        req.product = product;
        next();
    })
}


exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}


