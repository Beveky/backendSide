// const express = require("express");
// const router = express.Router();
// const paypal = require("@paypal/checkout-server-sdk");
// const dotenv = require("dotenv");
// dotenv.config();
// router.post("/payment", async (req, res) => {
//   try {
//     const request = new paypal.orders.OrdersCreateRequest();
//     request.requestBody({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: req.body.amount,
//           },
//         },
//       ],
//     });
//     const client = new paypal.core.PayPalHttpClient({
//       clientId: process.env.PAYPAL_CLIENT_ID,
//       clientSecret: process.env.PAYPAL_CLIENT_SECRET,
//     });

//     const response = await client.execute(request);
//     console.log("Create order response:", response.result);

//     res.status(200).json({ success: true, paypalOrderId: response.result.id });
//   } catch (error) {
//     console.error("Error creating PayPal order:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;
