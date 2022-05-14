import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import Order from "./Order";
import { order } from "../providers/order.provider";

function Orders() {
	const value = useContext(order);
	const orders = value.orders;

	return (
		<div className="orders">
			<h1>Your Orders</h1>

			<div className="orders__order">
				{orders?.map((order) => (
					<Order key={order._id} order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
