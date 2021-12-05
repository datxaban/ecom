const Products = require('../models/productModel')
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        //get the queryString from req.query
        const queryObj = { ...this.queryString }

        //list of excluded words
        const excludedFields = ['page', 'sort', 'limit']

        //delete excluded words
        excludedFields.forEach(el => delete (queryObj[el]))

        //convert the queryObject to queryString
        let queryStr = JSON.stringify(queryObj)

        //replace some particular text in URL
        queryStr = queryStr.replace(/regex/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr)) //query base on search word

        return this;
    }

    sorting() {

        if (this.queryString.sort) { //sort base on price and sale
            this.query = this.query.sort(this.queryString.sort)
        }
        else { //sort base on created time
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const productCtrl = {
    getProducts: async(req,res)=>{
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering()
                .sorting()
                .paginating()

            //get product satisfied the query
            const products = await features.query
            res.json({
                status: 'success',
                result: products.length,
                products: products

            })
        }
        catch(error){
            return res.stats(500).json({msg:error.message})
        }
    },
    createProduct:async(req,res)=>{
        try{
            
            //check image in product
            const {product_id, title, price, description, content, images, category} = req.body
            if(!images) return res.status(400).json({msg:"No image upload"})

            //check product id duplicated
            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg:"Product already existed"})
            
            ///save new product
            const newProduct = new Products({
                product_id, 
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category,
            })
            await newProduct.save()
            
            res.json({msg:"Created new product"})
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    deleteProduct: async(req,res)=>{
        try{
            //delete product with id req.params.id
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a product"})
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    updateProduct:async(req,res)=>{
        try{
            const {title, price, description, content, images , category} = req.body
            if(!images) return res.stats(400).json({msg:"Please upload image"}) //check image exist

            //update product with id req.params.id
            await Products.findOneAndUpdate({_id:req.params.id},{
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            }) //update product using id
            res.json({msg:"Updated product"}) // return
        }
        catch(error){
            return res.stats(500).json({msg:error.message})
        }
    }
}

module.exports = productCtrl