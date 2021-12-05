require('dotenv').config()
const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const PORT = 5000

console.log("Start Server")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


//Route
app.use('/user', require('./routes/userRoute'));
app.use('/api', require('./routes/cateRoute'))
app.use('/api',require('./routes/uploadRoute'))
app.use('/api', require('./routes/productRoute'))
app.use('/api',require('./routes/paymentRoute'))

//DB connect
const URI = process.env.MONGODB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})



//Start
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  })

