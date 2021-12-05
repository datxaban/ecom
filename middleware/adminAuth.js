const Users = require('../models/userModel')

const authAdmin = async (req,res,next)=>{
    try{    
        //Check user exist and permission
        const user = await Users.findOne({
            _id: req.user.id
        })

        if(!user) return res.status(400).json({msg:"Please login or register"})
        if(user.role === false) return res.status(400).json({msg:"Admin access denied"})
        next()
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

module.exports = authAdmin