const cloudinary  = require('cloudinary')
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const imageCtrl = {
    uploadImage:async(req,res)=>{
        try{
            //check file exist
            if(!req.files || Object.keys(req.files).length ===0){
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg:"Please choose image"})
            }
            
            //get image from user's file
            const file = req.files.file;
            
            //check file size
            if(file.size > 2048*2048){
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg:"Image size too large "})
            }

            //check file format
            if(file.mimetype !=="image/jpeg" && file.mimetype !== 'image/png'){
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg:"Format invalid"})
            }

            //upload to cloudinary
            cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},(error,result)=>{
                if(error) throw err
                removeTmp(file.tempFilePath)
                res.json({msg:"Uploaded",
                    public_id: result.public_id,
                    url: result.secure_url
                })
            })
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    deleteImage:async(req,res)=>{
        try{
            const{public_id} = req.body
            //check image exist or not
            if(!public_id){
                return res.status(400).json({msg:"Please choose image "})
            }
            
            //delete image on cloudinary
            cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
                if(err) throw err
                res.json({msg:"Deleted image"})
            })
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    }
}

const removeTmp = (path)=>{
    fs.unlink(path,(error)=>{
        if(error) throw error
    })
}

module.exports = imageCtrl