// Import necessary modules
const dotenv = require("dotenv");
const Payment = require("../models/Payment"); // Assuming Payment model is defined in Payment.js inside the models folder

// Load environment variables
dotenv.config({ path: "./config/config.env" });


// Define controller methods
exports.createPayment = async (req, res) => {
  const { base64 } = req.body;
  try {
    // Create a new payment record
    await Payment.create({ image: base64 });
    res.send({ status: "ok" });
  } catch (error) {
    // Handle errors
    res.status(500).send({ status: "error", data: error.message });
  }
};

