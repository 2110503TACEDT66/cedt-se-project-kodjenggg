const express = require("express");
const { cardPayment , webhooks} = require("../controllers/payment");

const router = express.Router();
const { protect } = require("../middleware/auth");

// Route for recording expenses
router.put("/:id", protect, cardPayment);
router.post("/webhook", webhooks, express.raw({ type: "application/json" }));

module.exports = router;