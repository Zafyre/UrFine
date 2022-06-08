import React from "react";
import "./CheckoutProduct.css";

function CheckoutProduct({
	id,
	image,
	title,
	price,
	quantity,
	description,
	breed,
}) {
	return (
		<div className="checkoutProduct">
			<img
				className="checkoutProduct__image"
				src={process.env.REACT_APP_API_URI + image}
			/>

			<div className="checkoutProduct__info">
				<p className="checkoutProduct__title">{title}</p>
				<p>{description}</p>
				<p>{breed || ""}</p>
				<p className="checkoutProduct__price">
					<small>₹</small>
					<strong>{price}</strong>
					{"\t"}
					<small>x</small>
					{"\t"}
					{quantity}
				</p>
			</div>
		</div>
	);
}

export default CheckoutProduct;
