const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    image : String

});

module.exports = mongoose.model("Payment", PaymentSchema);
