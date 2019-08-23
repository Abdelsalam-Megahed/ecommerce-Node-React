const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((error, category) =>{
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({category})
    })
}