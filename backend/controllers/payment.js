//import { buffer } from "micro";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Import Stripe
const { v4: uuidv4 } = require('uuid'); // Import UUID
//const conn = require('../db/connection'); // Import database connection
const Reservation = require("../models/Reservation");

// @desc    Make card payment
// @route   PUT /api/v1/reservations/payment/:reserveId
// @access  Private
exports.cardPayment = async (req, res, next) => {
    //const { product, information } = req.body;
    try {
        // Find the reservation in the database
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }
        // const reserveId = uuidv4();
        console.log(reservation)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "thb",
                        product_data: {
                            name: `Reservation ${reservation._id}`,
                        },
                        unit_amount: reservation.totalPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:3000/mybooking`,
            cancel_url: `http://localhost:3000/`,
        });

        // const data = {
        //     // name: information.name,
        //     // address: information.address,
        //     session_id: session.id,
        //     status: session.status,
        //     // order_id: orderId,
        // };

        console.log("session", session);

          // Update the reservation with payment session ID and status
        //const updateReservation = await Reservation.findByIdAndUpdate(req.params.id, {sessionId: session.id})
          //reservation.status = session.status == "succeeded" ? "reserves" : "unpaid"; // Update status as needed
        reservation.sessionId = session.id;
        await reservation.save();
        
        //const [result] = await conn.query("INSERT INTO orders SET ?", data); //update

        res.json({
            message: "Checkout success.",
            id: session.id,
            reservation,
        });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ error: "Error payment" });
    }
};

exports.webhooks = async (req, res) => {
    console.log("In Webhook")
    //const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.ENDPOINTSECRET);
    } catch (err) {
      console.log(err.message)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const paymentSuccessData = event.data.object;
        const sessionId = paymentSuccessData.id;

        console.log(paymentSuccessData)
        console.log(sessionId)

        const filter = { sessionId: sessionId };
        const update = { status: paymentSuccessData.status === 'complete' ? 'reserved' : 'unpaid' };
  
        const reservation = await Reservation.findOneAndUpdate(filter,update);
        if (!reservation) {
            console.log('reservation not found')
            return res.status(404).json({ success: false, message: "Reservation not found" });
        } 
        console.log(reservation)
        console.log(paymentSuccessData.status )

        // const changeStatus = await Reservation.findByIdAndUpdate(, req.body, {
        //     new: true,
        //     runValidators: true,
        //   })
  
        reservation.status = (paymentSuccessData.status == "complete")? "reserved" : "unpaid";
        await reservation.save();
  
        console.log("=== update result", reservation);
  
        // event.data.object.id = session.id
        // event.data.object.customer_details คือข้อมูลลูกค้า
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
};