import React, { useState, useEffect } from "react";
// import {storeProducts} from "./data";
import axios from "axios";
const product = React.createContext();
const { Provider } = product;

let cartItems = [];

const ProductProvider = ({ children }) => {
	let storeProducts = [];

	const [cart, setCart] = useState([]);
	const [products, setProducts] = useState([]);
	const [modalOpen, setModal] = useState(false);
	const [totalAmt, setTotalAmt] = useState(0);
	const [detailProduct, setDetailProduct] = useState();
	const [modalProduct, setModalProduct] = useState([]);

	const fetchProducts = async () => {
		const response = await axios.get(
			process.env.REACT_APP_API_URI + "/api/products"
		);
		console.log(response.data);
		storeProducts = response.data.products;
		setDetailProduct(storeProducts[0]);
		setProducts(storeProducts);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	function addToCart(id) {
		console.log(id);
		products.forEach((item, i) => {
			if (item._id === id) {
				item.inCart = true;
				item.count = 1;
				item.total = item.price;
				cartItems.push(item);
			}
		});
		setCart(cartItems);
		getTotal();
		// console.log(products);
		// console.log('store: ', storeProducts);
	}

	function getItem(id) {
		const product = products.find((item) => item._id === id);
		// console.log(id, products, product);
		return product;
	}

	function handleDetail(id) {
		const detailProduct = getItem(id);
		setDetailProduct(detailProduct);
	}

	function openModal(id) {
		const modalProduct = getItem(id);
		setModalProduct(modalProduct);
		setModal(true);
	}

	function closeModal() {
		setModal(false);
	}

	function increaseCount(id) {
		cartItems.forEach((item, i) => {
			if (item._id === id) {
				item.count = item.count + 1;
				item.total = item.price * item.count;
				getTotal();
			}
		});
		// console.log('inc: ', cartItems);
		setCart(cartItems);
	}

	function decreaseCount(id) {
		cartItems.forEach((item, i) => {
			if (item._id === id) {
				item.count = item.count - 1;
				item.total = item.price * item.count;
				if (item.count === 0) {
					removeFromCart(item._id);
				}
				getTotal();
			}
		});
		// console.log('dec: ', cartItems);
		setCart(cartItems);
	}

	function removeFromCart(id) {
		let tempProducts = [...products];

		const index = tempProducts.indexOf(getItem(id));
		let removedProduct = tempProducts[index];
		removedProduct.inCart = false;
		removedProduct.count = 0;
		removedProduct.total = 0;
		setProducts([...tempProducts]);

		cartItems = cartItems.filter((item) => {
			return item._id !== id;
		});
		getTotal();
		setCart(cartItems);
	}

	function getTotal() {
		let total = 0;
		cartItems.forEach((item, i) => {
			total = total + item.total;
		});
		setTotalAmt(total);
	}

	function clearCart() {
		cartItems = [];
		setProducts((prevState) => {
			const newProducts = prevState.map((item) => {
				return { ...item, inCart: false, count: 0, total: 0 };
			});
			return newProducts;
		});
		setCart(cartItems);
		getTotal();
	}

	return (
		<Provider
			value={{
				cart,
				setCart,
				products,
				modalOpen,
				totalAmt,
				addToCart,
				handleDetail,
				detailProduct,
				openModal,
				closeModal,
				modalProduct,
				increaseCount,
				decreaseCount,
				removeFromCart,
				clearCart,
				fetchProducts,
			}}
		>
			{children}
		</Provider>
	);
};

export { product, ProductProvider };
