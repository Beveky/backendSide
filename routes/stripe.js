// routes/stripe.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51Oi29jDFl4v3mZfld0abh2Dsniq2fPPCv31DXa9HfAbWDyRjyGqQoN5eQdtChhMdwDRp82dF5nVF41HI1Kyq8odM00Y3EeaaP8"
);

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body; // Assuming you're sending cart products in the request body

  try {
    const lineItems = products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // You can add more details here like description, images, etc.
        },
        unit_amount: item.price * 100, // Assuming price is in dollars and converted to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
