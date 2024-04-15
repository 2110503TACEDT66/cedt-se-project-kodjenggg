const express = require("express");
const { getRooms,dummy } = require("../controllers/rooms");

const router = express.Router();

router
  .route("/:id")
  .get(getRooms);

module.exports = router;
