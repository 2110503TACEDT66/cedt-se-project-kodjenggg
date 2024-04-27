const express = require("express");
const { recordExpense } = require("../controllers/payment");

const router = express.Router();
const { protect } = require("../middleware/auth");

// Route for recording expenses
router.post("/api/payment", protect, recordExpense);

module.exports = router;