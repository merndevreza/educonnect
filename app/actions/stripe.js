"use server";
import { formatAmountForStripe } from "@/lib/stripeHelper";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

const CURRENCY = "USD";

export async function createCheckoutSession(data) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");
  const courseId = data.get("courseId");
  
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: data.get("courseTitle"),
          },
          unit_amount: formatAmountForStripe(data.get("coursePrice"), CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

//stripe will automatically call the function below,

export async function createPaymentIntent(data) {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: formatAmountForStripe(data.get("coursePrice"), CURRENCY),
    automatic_payments_methods: { enabled: true },
    currency: CURRENCY,
  });
  return { client_secret: paymentIntent.client_secret };
}
