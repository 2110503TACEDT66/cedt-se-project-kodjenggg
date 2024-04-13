const { query } = require("express");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

exports.getRooms = async (req, res, next) => {
  let query;

  if(req.params.id) {
    console.log(req.params.id);
    query = Room.find({ hotel_id: req.params.id })
  }

  try {
    const room = await query;
    res.status(200).json({
      success: true,
      count: room.length,
      data: room,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Room" });
  }
};