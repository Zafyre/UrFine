import React, { useState, useEffect } from "react";
// import {storePets} from "./data";
import axios from "axios";
const pet = React.createContext();
const { Provider } = pet;

let cartItems = [];

const PetProvider = ({ children }) => {
	let storePets = [];

	const [cart, setCart] = useState([]);
	const [pets, setPets] = useState([]);
	const [modalOpen, setModal] = useState(false);
	const [totalAmt, setTotalAmt] = useState(0);
	const [detailPet, setDetailPet] = useState();
	const [modalPet, setModalPet] = useState([]);

	const fetchPets = async () => {
		const response = await axios.get(
			process.env.REACT_APP_API_URI + "/api/pets"
		);
		console.log(response.data);
		storePets = response.data.pets;
		setDetailPet(storePets[0]);
		setPets(storePets);
	};

	useEffect(() => {
		fetchPets();
	}, []);

	function addToCart(id) {
		console.log(id);
		pets.forEach((item, i) => {
			if (item._id === id) {
				item.inCart = true;
				item.count = 1;
				item.total = item.price;
				cartItems.push(item);
			}
		});
		setCart(cartItems);
		getTotal();
		// console.log(pets);
		// console.log('store: ', storePets);
	}

	function getItem(id) {
		const pet = pets.find((item) => item._id === id);
		// console.log(id, pets, pet);
		return pet;
	}

	function handleDetail(id) {
		const detailPet = getItem(id);
		setDetailPet(detailPet);
	}

	function openModal(id) {
		const modalPet = getItem(id);
		setModalPet(modalPet);
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
		let tempPets = [...pets];

		const index = tempPets.indexOf(getItem(id));
		let removedPet = tempPets[index];
		removedPet.inCart = false;
		removedPet.count = 0;
		removedPet.total = 0;
		setPets([...tempPets]);

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
		setPets((prevState) => {
			const newPets = prevState.map((item) => {
				return { ...item, inCart: false, count: 0, total: 0 };
			});
			return newPets;
		});
		setCart(cartItems);
		getTotal();
	}

	return (
		<Provider
			value={{
				cart,
				setCart,
				pets,
				modalOpen,
				totalAmt,
				addToCart,
				handleDetail,
				detailPet,
				openModal,
				closeModal,
				modalPet,
				increaseCount,
				decreaseCount,
				removeFromCart,
				clearCart,
				fetchPets,
			}}
		>
			{children}
		</Provider>
	);
};

export { pet, PetProvider };
