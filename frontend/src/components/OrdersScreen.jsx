import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrdersScreen(props) {
	return (
		<div className="content content-margined">
			<div className="order-header">
				<h3>Orders</h3>
			</div>
			<div className="order-list">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>DATE</th>
							<th>PRODUCTS</th>
							<th>TOTAL</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.createdAt}</td>
								<td>{order.totalPrice}</td>
								<td>{order.user.name}</td>
								<td>{order.isPaid.toString()}</td>
								<td>{order.paidAt}</td>
								<td>{order.isDelivered.toString()}</td>
								<td>{order.deliveredAt}</td>
								<td>
									<Link to={"/order/" + order._id} className="button secondary">
										Details
									</Link>{" "}
									<button
										type="button"
										onClick={() => deleteHandler(order)}
										className="button secondary"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default OrdersScreen;
