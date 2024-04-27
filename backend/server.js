const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require('express-mongo-sanitize') ;
const helmet = require('helmet') ;
const {xss} = require('express-xss-sanitizer') ;
const rateLimit = require('express-rate-limit') ;
const hpp = require('hpp') ;
const cors = require('cors') ;
const multer = require('multer');
const path = require('path');
const PaymentModel = require("./models/Payment")

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Sanitize data
app.use(mongoSanitize()) ;

//Set security headers
app.use(helmet()) ;

//Prevent XSS attacks
app.use(xss()) ;

app.use(express.static('public')); 
//Rate Limiting 
const limiter = rateLimit ({
  windowMs : 10*60*1000 , //10 mins
  max : 10000
}) ;
app.use(limiter) ;

//Prevent http param pollutions 
app.use(hpp()) ;

//Enable CORS
app.use(cors()) ;

//Cookie parser
app.use(cookieParser());



//Route files
const hotels = require("./routes/hotels");
const auth = require("./routes/auth");
const reservations = require("./routes/reservations");
const reviews = require('./routes/reviews');
const rooms = require("./routes/rooms");

//Mount routers
app.use("/api/v1/hotels", hotels);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/rooms", rooms);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

// Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & Exit process
  server.close(() => process.exit(1));
});






// Define storage for the images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/img');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

const upload = multer({
  storage : storage 
})

app.post("/api/v1/payments", upload.single('file') , (req,res) => {
  console.log(req.file) ;
  PaymentModel.create({
    reservid : "661ad32dc15463157a95156a",
    picture : req.file.filename
  } )
  .then(result => res.json(result))
  .catch(err => console.log(err)) 
})

app.get("/api/v1/payments/:id" ,async (req,res) => {
  console.log(req.params.id)
  try{
    const singlePayment =await PaymentModel.findById(req.params.id)
    if ( !singlePayment) {
      console.log("Dollar")
      return res.status(400).json({success : false})
    }
      res.status(200).json({success : true  , data : singlePayment}) ;
  }catch (err) {
    console.log(err)
    return res.status(400).json({success : false})
  }
})
  
  