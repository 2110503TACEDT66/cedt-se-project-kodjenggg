const express = require("express");
const { cardPayment, 
    promtpayPayment , 
    webhooks,
    createPayment,
    getPayment} = require("../controllers/payment");

const router = express.Router();
const { protect } = require("../middleware/auth");

// Route for recording expenses
router.put("/card/:id", protect, cardPayment)
      .put("/promtpay/:id", protect, promtpayPayment);
router.post("/webhook", webhooks, express.raw({ type: "application/json" }));

//Include other resource routers

//const { protect, authorize } = require("../middleware/auth");

router
    .route("/")
    .post(createPayment)
    

router
    .route("/:id")
    .get(getPayment)
module.exports = router;