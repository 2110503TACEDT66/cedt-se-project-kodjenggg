const express = require("express");
const { 
  getRooms,
  dummy,
  addRoom
} = require("../controllers/rooms");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/:id")
  .get(getRooms);

// router
//   .route("/")
//   .post(protect, authorize("admin", "hotelmanager"), addRoom);

router.route("/").post(protect, authorize("admin", "hotelmanager"), addRoom);


module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - price
 *         - roomtype
 *         - bedtype
 *         - hotel_id
 *         - roomcap
 *         - picture
 *       properties:
 *         price:
 *           type: number
 *           description: Price of the room
 *         roomtype:
 *           type: string
 *           enum:
 *             - Deluxe Room
 *             - Suite
 *             - Executive Room
 *             - Family Room
 *           description: Type of the room
 *         bedtype:
 *           type: string
 *           enum:
 *             - King Bed
 *             - Queen Bed
 *             - Double Bed
 *             - Twin Bed
 *             - Sofa Bed
 *           description: Type of the bed in the room
 *         hotel_id:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the hotel where the room belongs
 *         roomcap:
 *           type: number
 *           description: Capacity of the room
 *         picture:
 *           type: string
 *           description: URI of the room's picture
 */

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get rooms by hotel ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hotel to retrieve rooms for
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error
 *
 */
