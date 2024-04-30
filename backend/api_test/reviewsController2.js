const { query } = require("express");
const Review = require('../models/Review.js') ;
const Hotel = require("../models/Hotel.js");

exports.updateReview = async (req, res, next) => {

    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!review) {
        return res.status(400).json({ success: false });
      }
      // Check if the user is the owner of the review
      if (review.userid.toString() !== req.user.id && req.user.role!=="admin") {
        return res.status(403).json({ success: false, message: "You are not authorized to update this review" });
      }
      res.status(200).json({ success: true, data: review });
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false });
    }
  };

  exports.deleteHotel = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
  
      if (!hotel) {
        return res.status(404).json({ success: false });
      }
  
      await hotel.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };