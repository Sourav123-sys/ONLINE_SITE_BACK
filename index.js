const express = require('express')
const  morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const expressJwt = require('express-jwt')
const cors=require('cors')
const path = require('path')
 require ('dotenv').config()

//import routes 


const authRoutes = require ('./routes/auth.js')
const userRoutes = require ('./routes/user')
const categoryRoutes = require ('./routes/category')
const productRoutes = require ('./routes/product')
const braintreeRoutes = require ('./routes/braintree')
const orderRoutes = require ('./routes/order')
//app
 const app = express()
 
//db
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
}).then(() =>console.log(' db Connect'));

console.log(process.env.MONGODB_URI)

// route
// app.get('/', function (req, res) {
//     res.send('Hello World update')
//   })

//middleWares

app.use(morgan('div'));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());


app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",braintreeRoutes)

 const PORT = (process.env.PORT || 8080)

// if(process.env.NODE_ENV=='production') {
//     app.use(express.static("client/build"))
// }


//server static assest
if(process.env.NODE_ENV==='production') {
     app.use(express.static("client/build"))
  
app.use(express.static('client/build'));
app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})}
app.listen(PORT, ()=>{
    console.log(`its running on port : ${PORT}`)
})