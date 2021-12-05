const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payment = require('../models/paymentModel')
const userCtrl = {
    register: async (req, res) => {
        try {
            //get user information from request body
            const { name, email, password} = req.body

            //check password length
            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 char" })

            //check user exist
            const user = await Users.findOne({ email })

            if (user) return res.status(400).json({ msg: "Email is invalid" })

            
            
            //encrypt password with 10 salt round
            const passwordHash = await bcrypt.hash(password, 10)
            
            const newUser = new Users({
                name, email, password: passwordHash
            })
           
            //save user's account
            await newUser.save()

            //create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            //save refresh token into cookie in client web browser limited time
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ msg: "Sign up successful", accesstoken, refreshtoken })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    registerAdmin: async (req, res) => {
        try {
            //get user information from request body
            
            const { name, email, password} = req.body

            //check into the database either that the email exist or not
            const user = await Users.findOne({ email })

            if (user) return res.status(400).json({ msg: "Email invalid" })
  
            //check password length
            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 char" })
            
            //encrypt password with 10 salt rounds
            const passwordHash = await bcrypt.hash(password, 10)
            
            const newUser = new Users({
                name, email, password: passwordHash,isAdmin:true
            })
           
            //save user's account to mongoDB
            await newUser.save()

            //create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            //save refresh token into cookie in client web browser
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ msg: "Sign up successful", accesstoken, refreshtoken })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: (req,res)=>{
        try{
            //get refresh token from cookie
            const rf_token = req.cookies.refreshtoken
 
            if (!rf_token) return res.status(400).json({ msg: "Please login or sign up" })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login or sign up" })
                //if refresh token is verify, create new access token from user.id
                const accesstoken = createAccessToken({ id: user.id })
                
                res.json({ user, accesstoken })
        })
        }catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    login: async (req,res)=>{
        try{
            //get email and password from request body
            const { email, password } = req.body
            
            //check if email correct and exist or not 
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Email is incorrect." })

            //check the password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

            //if password is correct then generate the new access and refresh token 
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            //save refresh token to cookie in client web browser
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ msg: "Login successful", accesstoken })
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    logout: async (req, res) => {
        try {
            //Clear refresh token
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.status(200).json({ msg: "Logged out" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            //get user from request user
            //Object user bao gồm user id
            const user = req.user

            //check if user in request exist or not
            if (!user) return res.status(400).json({ msg: "Bad request." });

            //if user in request exist then find user by id into mongoDB
            const newUser = await Users.findById({ _id: user.id }).select('-password')

            //check user exist or not
            if (!newUser) return res.status(400).json({ msg: "User does not exist" });

            //if user exist then response user information
            res.json(newUser)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    addcart: async (req, res) => {
        try {
            const id = req.user.id

            const user = await Users.findById(id)

            if (!user) return res.status(400).json("Account does not exist");
            
            //Update cart field
            await Users.findByIdAndUpdate({ _id: user._id }, { cart: req.body.cart })

            res.json({ msg: "Product added to cart" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOrderHistory: async (req, res)   => {
        try {
            const user = req.user

            //get Payment from user id
            if (!user) return res.status(400).json({ msg: "Please login" });
            const payments = await Payment.find({ user_id: user.id })

            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const createAccessToken = (user) =>{
    //Encrypt the user _id with HS256, private key ACCESS_TOKEN
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '11m' })
}

const createRefreshToken = (user) =>{
    //Encrypt the user _id with HS256, private key REFRESH_TOKEN
    return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '7d' })
}

module.exports = userCtrl