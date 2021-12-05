const Payment = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')

const paymentCtrl = {
    getPayment: async (req,res) => {
        try{
            //get all payment
            const payments = await Payment.find()
            res.json(payments)
        }
        catch(error){
            return res.status(500).json({msg: error.message});
        }
    },
    createPayment: async (req,res) => {
        try{
            //get user who create payment
            const user = await Users.findById(req.user.id).select("name email")
            
            //check login status
            if(!user) return res.status(400).json({msg:"Pls Login"});

            const {total, cart, paymentID, address} = req.body
            const {_id, name, email} = user

            //create new payment
            const newPayment = new Payment({
                user_id: _id, name, email, cart, address, paymentID, total
            })

            cart.filter(item => {
                return updateSold(item._id, item.quantity, item.sold)
            })

            await newPayment.save()
            res.json({ msg: "Payment Success" })
        }
        catch(error){
            return res.status(500).json({msg: error.message})
        }
    }
}

//Update amount of sold product
const updateSold = async (id, quantity, oldSold) => {
    await Products.findByIdAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl