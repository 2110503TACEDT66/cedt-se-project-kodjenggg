// Import necessary modules
const dotenv = require("dotenv");
const Payment = require("../models/Payment"); // Assuming Payment model is defined in Payment.js inside the models folder

// Load environment variables
dotenv.config({ path: "./config/config.env" });


// @desc    Get single payment
// @route   Get /api/v1/payments/:id
// @access  Public
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: 'reservid',
        populate: [
          { path: 'hotel', select: 'name address district province postalcode tel region picture' },
          { path: 'user', select: 'name tel email role' },
          { path: 'room' }
        ]
      });


    console.log(payment)
    if (!payment) {
      return res.status(400).json({ success: false , P : "lhor"});
    }

    res.status(200).json({ success: true, data: payment });
  } catch (err) {
    res.status(400).json({ success: false , Dollar : "lhor" });
  }
};

// Define controller methods
exports.createPayment = async (req, res) => {
  const { reservid, image } = req.body;

  try {
    // Create a new payment record
    const payment = await Payment.create({reservid : reservid ,image: image });
    res.send({ status: "ok"  , data : payment});
    
  } catch (error) {
    // Handle errors
    res.status(500).send({ status: "error", data: error.message });
  }
};

