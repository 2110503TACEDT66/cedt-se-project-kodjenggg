const express = require("express");

const {
 createPayment,
 getPayment
} = require("../controllers/payment");

//Include other resource routers
const router = express.Router();

//const { protect, authorize } = require("../middleware/auth");



router
    .route("/")
    .post(createPayment)
    
router
    .route("/:id")
    .get(getPayment)
module.exports = router;