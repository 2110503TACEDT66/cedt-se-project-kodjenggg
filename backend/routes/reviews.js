const express = require("express");

const {
  getReviews ,
  updateReview ,
  updateReport ,
  updateReply,
  addReview,
  deleteReview
} = require("../controllers/reviews");

//Include other resource routers
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getReviews)
  .post(protect, authorize("admin", "user"), addReview);

router
    .route("/:id")
    .put(protect , authorize("user","admin") ,updateReview)
    .delete(protect, authorize("admin", "user"), deleteReview);
router
    .route("/reply/:id")
    .put(protect, authorize("hotelmanager"), updateReply)
router
    .route("/report/:id")
    .put(protect , authorize("user") , updateReport)

module.exports = router;
