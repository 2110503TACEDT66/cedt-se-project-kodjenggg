const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Import Stripe
const { v4: uuidv4 } = require('uuid'); // Import UUID
const conn = require('../db/connection'); // Import database connection

exports.recordExpense = async (req, res, next) => {
    const { product, information } = req.body;
    try {
        // Find the reservation in the database
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }
        // const reserveId = uuidv4();
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
            success_url: `http://localhost:3000/mybooking?id=${reservation._id}`,
            cancel_url: `http://localhost:3000/mybooking?id=${reservation._id}`,
        });

        const data = {
            // name: information.name,
            // address: information.address,
            session_id: session.id,
            status: session.status,
            // order_id: orderId,
        };

          // Update the reservation with payment session ID and status
          reservation.sessionId = session.id;
          reservation.status = session.status; // Update status as needed

        
        //const [result] = await conn.query("INSERT INTO orders SET ?", data); //update

        res.json({
            message: "Checkout success.",
            id: session.id,
            result,
        });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ error: "Error payment" });
    }
};


app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const paymentSuccessData = event.data.object;
        const sessionId = paymentSuccessData.id;
  
        const data = {
          status: paymentSuccessData.status,
        };
  
        const result = await conn.query("UPDATE orders SET ? WHERE session_id = ?", [
          data,
          sessionId,
        ]);
  
        console.log("=== update result", result);
  
        // event.data.object.id = session.id
        // event.data.object.customer_details คือข้อมูลลูกค้า
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  });



app.get("/order/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const [result] = await conn.query("SELECT * from orders where order_id = ?", orderId);
    const selectedOrder = result[0];
    if (!selectedOrder) {
      throw {
        errorMessage: "Order not found",
      };
    }
    res.json(selectedOrder);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error: error.errorMessage || "System error" });
  }
});
