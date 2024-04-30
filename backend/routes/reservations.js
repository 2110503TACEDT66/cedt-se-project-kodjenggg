const express = require("express");
const {
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation
} = require("../controllers/reservations");

const router = express.Router({ mergeParams: true });

//protect = have to login
//authorize = role check
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getReservations)
  .post(protect, authorize("admin", "user"), addReservation);
router
  .route("/:id")
  .get(protect, getReservation)
  .put(protect, authorize("admin", "user","hotelmanager"), updateReservation)
  .delete(protect, authorize("admin", "user", "hotelmanager"), deleteReservation);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API endpoints for managing reservations
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     reservationId:
 *       name: id
 *       in: path
 *       required: true
 *       description: ID of the reservation
 *       schema:
 *         type: string
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - revDate
 *         - user
 *         - hotel
 *         - room
 *         - totalPrice
 *       properties:
 *         sessionId:
 *           type: string
 *           description: Session ID
 *         revDate:
 *           type: string
 *           format: date-time
 *           description: Date of reservation
 *         nightNum:
 *           type: number
 *           default: 1
 *           description: Number of nights for the reservation
 *         user:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the user making the reservation
 *         hotel:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the hotel where the reservation is made
 *         room:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the room reserved
 *         totalPrice:
 *           type: number
 *           description: Total price of the reservation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the reservation was created
 *         status:
 *           type: string
 *           enum:
 *             - unpaid
 *             - pending
 *             - disapproved
 *             - reserved
 *             - completed
 *             - reviewed
 *           default: unpaid
 *           description: Current status of the reservation
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
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
 *                     $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a single reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the reservation
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */

/**
 * 
 * /reservations/{hotelId}/reservation:
 *   post:
 *     summary: Add a new reservation
 *     tags: [Reservations]
 *     parameters:
 *       - name: hotelId
 *         in: path
 *         required: true
 *         description: ID of the hotel where the reservation is made
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hotel or Room not found
 *       500:
 *         description: Server error
 */

/**
 * 
 * /reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the reservation to update
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */

/**
 * 
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the reservation to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
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
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
