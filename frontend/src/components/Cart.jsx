import axios, { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { order } from "../providers/order.provider";
import { product } from "../providers/product.provider";
import auth from "../utils/auth";
import { showToast } from "../utils/toasts";
import CartList from "./CartList";
import DetailButton from "./DetailButton";
import StripeCheckout from "react-stripe-checkout";

const Cart = (props) => {
	const value = useContext(product);
	const orderValue = useContext(order);

	const history = useHistory();

	const cartItems = value.cart.map((item) => {
		return (
			<CartList
				key={item._id}
				id={item._id}
				img={item.image}
				title={item.name}
				price={item.price}
				count={item.count}
			/>
		);
	});

	const Button = styled.button`
		width: 100%;
		padding: 10px;
		background-color: black;
		color: white;
		font-weight: 600;
	`;

	if (value.cart.length === 0) {
		return (
			<div className="container">
				<div className="main-heading-container">
					<h1 className="main-heading">Your Cart</h1>
				</div>
				<h2>Your cart is empty... </h2>
			</div>
		);
	} else {
		if (window.innerWidth <= 450) {
			return (
				<div className="container cartContainer">
					<div className="main-heading-container">
						<h1 className="main-heading">Your Cart</h1>
					</div>

					<div
						className="row cartHeaderRow"
						style={{ textAlign: "center", marginBottom: "15px" }}
					>
						<div className="col-5 product-name">
							<b>Product Name</b>
						</div>
						<div className="col-3 product-quantity">
							<b>Quantity</b>
						</div>
						<div className="col-2 product-remove">
							<b>Remove</b>
						</div>
						<div className="col-2 product-amt">
							<b>Item Total</b>
						</div>
					</div>

					{cartItems}

					<div
						className="row"
						style={{
							textAlign: "right",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="col-12" style={{ paddingRight: "5%" }}>
							<div
								onClick={() => value.clearCart()}
								style={{ display: "inline-block" }}
							>
								<DetailButton
									btnTxt="Clear Cart"
									btnClass="btn-outline-warning detailBtn"
								/>
							</div>
							<h4 style={{ display: "inline-block", margin: "auto 10px" }}>
								<b>Total: </b> <i className="fas fa-rupee-sign"></i>
								{value.totalAmt}
							</h4>
						</div>
					</div>
					<br />
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="main-heading-container">
						<h1 className="main-heading">Your Cart</h1>
					</div>

					<div
						className="row"
						style={{ textAlign: "center", marginBottom: "15px" }}
					>
						<div className="col-2 product-img">
							<b>Product</b>
						</div>
						<div className="col-3 product-name">
							<b>Product Name</b>
						</div>
						<div className="col-2 product-price">
							<b>Price</b>
						</div>
						<div className="col-2 product-quantity">
							<b>Quantity</b>
						</div>
						<div className="col-1 product-remove">
							<b>Remove</b>
						</div>
						<div className="col-2 product-amt">
							<b>Item Total</b>
						</div>
					</div>

					{cartItems}

					<br />

					<div
						className="row"
						style={{
							textAlign: "right",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="col-12" style={{ paddingRight: "5%" }}>
							<div
								onClick={() => value.clearCart()}
								style={{ display: "inline-block" }}
							>
								<DetailButton
									btnTxt="Clear Cart"
									btnClass="btn-outline-warning detailBtn"
								/>
							</div>

							<Link to="/stripecontainer">
								<DetailButton
									btnTxt="Confirm Order"
									btnClass="btn-outline-success detailBtn"
								/>
							</Link>

							<h4 style={{ display: "inline-block", margin: "auto 10px" }}>
								<b>Total: </b> <i className="fas fa-rupee-sign"></i>
								{value.totalAmt}
							</h4>
						</div>
					</div>
					<br />
				</div>
			);
		}
	}
};

export default Cart;
