import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { order } from "../providers/order.provider";
import { product } from "../providers/product.provider";
import auth from "../utils/auth";
import { showToast } from "../utils/toasts";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee",
		},
	},
};

export default function PaymentForm() {
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const value = useContext(product);
	const orderValue = useContext(order);

	const history = useHistory();

	const handleOrder = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				process.env.REACT_APP_API_URI + "/api/orders",
				{
					products: value.cart.map((item) => {
						return { product: item._id, quantity: item.count };
					}),
					totalPrice: value.totalAmt,
				},
				{
					headers: {
						"x-auth-token": auth.getToken(),
					},
				}
			);

			console.log(response.data);

			showToast("Order Cnfirmed", "success");

			value.clearCart();
			orderValue.addOrder(response.data.order);

			history.replace("/products");
		} catch (err) {
			if (err instanceof AxiosError) {
				showToast("Please Login To Place Order", "error");
			} else {
				console.log(err);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		if (!error) {
			try {
				const { id } = paymentMethod;
				const response = await axios.post("http://localhost:4000/api/payment", {
					amount: value.totalAmt * 100,
					id,
				});

				if (response.data.success) {
					console.log("Successful payment");
					handleOrder(e);
				}
			} catch (error) {
				console.log("Error", error);
			}
		} else {
			console.log(error.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<fieldset className="FormGroup">
					<div className="FormRow">
						<CardElement options={CARD_OPTIONS} />
					</div>
				</fieldset>
				<button>Pay</button>
			</form>
		</>
	);
}
