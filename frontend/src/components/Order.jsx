import React, { useContext } from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useParams } from "react-router-dom";
import { order } from "../providers/order.provider";

function Order(props) {
	const { id } = useParams();

	const value = useContext(order);
	const content = props.order || value.getOrder(id);

	return (
		<div className="order">
			<h2>Order</h2>
			<p>
				{moment
					.unix(parseInt(Date.parse(content.createdAt) / 1000))
					.format("MMMM Do YYYY, h:mma")}
			</p>
			<p className="order__id">
				<small>{order._id}</small>
			</p>
			{content.products.map(({ product }) => (
				<CheckoutProduct
					key={product._id}
					id={product._id}
					title={product.name}
					image={product.image}
					price={product.price}
				/>
			))}
			<CurrencyFormat
				renderText={(value) => (
					<h3 className="order__total">Order Total: {value}</h3>
				)}
				decimalScale={2}
				value={content.totalPrice}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"₹"}
			/>
		</div>
	);
}

export default Order;
