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

const app = express();


require("./models/Payment")


//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Body parser
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit:"25mb"}))

//Sanitize data
app.use(mongoSanitize()) ;

//Set security headers
app.use(helmet()) ;

//Prevent XSS attacks
app.use(xss()) ;

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
const payment = require("./routes/payments")
//Mount routers
app.use("/api/v1/hotels", hotels);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/rooms", rooms);
app.use("/api/v1/payments", payment) ;

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