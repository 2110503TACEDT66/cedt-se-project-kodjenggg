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
const bodyParser = require('body-parser')
require("dotenv").config();
//Load env vars
dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")("sk_test_51P6oXZHub7hok82f2kcmDah67GmCZC4ovavsgkWANdHtxVxD6hQNIYiKA2J4ljsJVsP86QEisF4tHiAIpFXQIYtF00ZxqAqjEI");
const endpointSecret = "whsec_1bc1e8c6cdb4ffb49d967af0ce7be7cb2b8f7601c0ec99304218a81ebf3a6b1e";
//Connect to database
connectDB();

const app = express();

app.use(
  bodyParser.json({
      verify: function(req, res, buf) {
          req.rawBody = buf;
      }
  })
);

//Body parser
app.use(express.json());

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

//const endpointSecret = "whsec_1bc1e8c6cdb4ffb49d967af0ce7be7cb2b8f7601c0ec99304218a81ebf3a6b1e";

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
const payment = require("./routes/payments");

//Mount routers
app.use("/api/v1/hotels", hotels);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/rooms", rooms);
app.use("/api/v1/payment", payment);

// app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
//   console.log("In webhook");
//   const buf = await buffer(req);
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.log(err.message)
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const paymentSuccessData = event.data.object;
//       const sessionId = paymentSuccessData.id;

//       console.log(paymentSuccessData)

//       // // const reservation = await Reservation.findById(sessionId);
//       // //   if (!reservation) {
//       // //       return res.status(404).json({ success: false, message: "Reservation not found" });
//       // //   }
  
//       // // reservation.status = (session.status == "succeeded")? "reserved" : "unpaid";

//       // console.log("=== update result", reservation);

//       // event.data.object.id = session.id
//       // event.data.object.customer_details คือข้อมูลลูกค้า
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   res.send();
// });

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
