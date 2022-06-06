import axios, { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import { pet } from "../../providers/pet.provider";
import auth from "../../utils/auth";
import "./newPet.css";
import { useHistory } from "react-router-dom";
import { showToast } from "../../utils/toasts";

export default function NewPet() {
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);

	const value = useContext(pet);
	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			let data = new FormData();
			data.append("name", inputs.name);
			data.append("description", inputs.description);
			data.append("breed", inputs.breed);
			data.append("price", inputs.price);

			data.append("image", file);

			const response = await axios.post(
				process.env.REACT_APP_API_URI + "/api/pets",
				data,
				{
					headers: {
						"x-auth-token": auth.getToken(),
					},
				}
			);

			console.log(response.data);

			value.fetchPets();

			history.replace("/pets");
		} catch (err) {
			if (err instanceof AxiosError) {
				showToast("Pls fill all the details", "error");
				console.log(err.response.data.message);
			} else {
				console.log(err);
			}
		}
	};

	return (
		<div className="newPet">
			<h1 className="addPetTitle">New Pet</h1>
			<form className="addPetForm">
				<div className="addPetItem">
					<label>Image</label>
					<input
						type="file"
						id="file"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				<div className="addPetItem">
					<label>Name</label>
					<input
						name="name"
						type="text"
						placeholder="Apple Airpods"
						onChange={handleChange}
					/>
				</div>
				<div className="addPetItem">
					<label>Breed</label>
					<input
						name="breed"
						type="text"
						placeholder="Labrador"
						onChange={handleChange}
					/>
				</div>
				<div className="addPetItem">
					<label>Description</label>
					<input
						name="description"
						type="text"
						placeholder="description..."
						onChange={handleChange}
					/>
				</div>
				<div className="addPetItem">
					<label>Price</label>
					<input
						name="price"
						type="number"
						placeholder="100"
						onChange={handleChange}
					/>
				</div>
				<button onClick={handleClick} className="addPetButton">
					Create
				</button>
			</form>
		</div>
	);
}
