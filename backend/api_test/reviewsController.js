const { query } = require("express");
const Review = require('../models/Review.js') ;
const Hotel = require("../models/Hotel.js");

exports.addReview = async (req,res,next) => {
    try{
      const hotel = await Hotel.findById(req.body.hotelid);
      if(!hotel){
        return res.status(404).json({
          success: false,
          message: `No hotel with the id of ${req.body.hotelid}`,
        });
      }
    
      req.body.user = req.user.id;
      console.log(req.body);
    
      const review = await Review.create(req.body);
      res.status(200).json({success:true, data:review});
      
    }catch(err){
      console.error(err.message);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  }

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