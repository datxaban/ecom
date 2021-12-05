const jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
    try{
        //Get accessToken
        const token = req.header("Authorization")

        //Check token exist
        if(!token) return res.status(400).json({msg:"Permission Denied"})

        //Verify token
        jwt.verify(token,process.env.ACCESS_TOKEN,(error,user)=>{
            if(error) return res.status(400).json({msg:"Authentication Failed"})

            //decode with symmetric HS256
            //user is decoded value {id,iat,exp}
            req.user = user 
            next()
        })
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

module.exports = auth