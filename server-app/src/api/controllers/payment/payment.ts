import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PUB_KEY as string, {
  apiVersion: "2023-10-16",
});

export const makePayment = async (req: any, res: any) => {
  const { amount, paymentMethod } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      confirm: true,
      confirmation_method: "automatic",
      return_url: "http://localhost:3000/dashboard", 
      payment_method: paymentMethod
    });

    res.status(200).json({
      success: true,
      message: "Payment successful",
      paymentIntent,
    });
  } catch (error: any) {
    console.error("Payment Error:", error);
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
