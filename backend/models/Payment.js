const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    reservid : {
        type : mongoose.Schema.ObjectId ,
        ref : "Reservation"
    },
    image : {
        type : String
    },
    paytime : {
        type: Date,
        default: Date.now
    }

});

PaymentSchema.virtual("reservations", {
    ref: "Reservation",
    localField: "reservid",
    foreignField: "_id",
    justOne: false,
  });

module.exports = mongoose.model("Payment", PaymentSchema);