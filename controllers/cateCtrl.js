const Category = require('../models/categoryModel')
const Products = require('../models/productModel')


const categoryCtrl = {
    getCategories: async(req,res)=>{
        try{
            //get all categories
            const categoriesList = await Category.find()
            res.json(categoriesList)
        }catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    createCategory: async(req,res)=>{
        try{
            const {cateName} = req.body;

            //Check exist cate
            const category = await Category.findOne({name:cateName})
            if (category) return res.status(400).json({msg:"Category exists."})
            
            //Add new category to DB
            const newCate = new Category({name:cateName})
            await newCate.save()

            res.json({msg:`Created new category: ${cateName}`})

        }catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    updateCategory: async(req,res)=>{
        try{
            const {cateName} = req.body
            //update  item id req.params.id with new name cateName
            await Category.findOneAndUpdate({_id:req.params.id},{name:cateName})
            res.json({msg:"Updated a category"})
        }catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    deleteCategory: async(req,res)=>{
        try{
            //Require to delete product belong to this cate first
            const productsList = await Products.findOne({category: req.params.id})
            if(productsList) return res.status(400).json({
                msg: "Please delete all products in this category"
            })
            //delete item with id req.params.id
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a Category"})
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = categoryCtrl