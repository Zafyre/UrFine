import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Paymentform from "./Paymentform";

const PUBLIC_KEY =
  "pk_test_51KxuvLSIUUoKiJcvhQnFNh72J1JOrepZsP2fLH6x2WyDM3o9nO6808rvrqS4SnuGR1YYY6oNX9XjZEIXVGFD6HAf00YII21DYr";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <Paymentform />
    </Elements>
  );
}
