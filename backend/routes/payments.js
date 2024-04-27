const express = require("express");

const {
 createPayment
} = require("../controllers/payment");

//Include other resource routers
const router = express.Router();

//const { protect, authorize } = require("../middleware/auth");



router
    .route("/")
    .post(createPayment)
    
module.exports = router;