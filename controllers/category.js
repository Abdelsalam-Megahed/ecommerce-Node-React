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

exports.categorybyId = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Category not found"  
          })
        }
        req.category = category;
        next();
    })
}

exports.read = (req, res) => {
    return res.json(req.category);
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Error updating the category"  
          })
        }
        return res.json(category)
    })
}

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, removedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Error deleting the category"  
          })
        }
        return res.json({
            message: "Category has been deleted",
            categoryName: category.name
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "Error retreving the categories"  
          })
        }
       return res.json(categories)
    })
}