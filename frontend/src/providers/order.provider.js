import axios, { AxiosError } from "axios";
import React, { createContext, useEffect, useState } from "react";
import auth from "../utils/auth";

const order = createContext();
const { Provider } = order;

const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		try {
			if (auth.getToken()) {
				const response = await axios.get(
					process.env.REACT_APP_API_URI + "/api/orders",
					{
						headers: {
							"x-auth-token": auth.getToken(),
						},
					}
				);

				console.log(response.data);

				setOrders(response.data.orders);
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response.data.message);
			} else {
				console.log(err);
			}
		}
	};

	const addOrder = (newOrder) => {
		setOrders((prevState) => {
			return [...prevState, newOrder];
		});
	};

	const getOrder = (id) => {
		return orders.find((order) => order._id === id);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<Provider
			value={{
				orders,
				fetchOrders,
				addOrder,
				getOrder,
			}}
		>
			{children}
		</Provider>
	);
};

export { order, OrderProvider };
