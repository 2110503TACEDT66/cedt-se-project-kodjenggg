const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  reservid : {
    type : mongoose.Schema.ObjectId
  } ,
  picture : {
    type : String 
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
