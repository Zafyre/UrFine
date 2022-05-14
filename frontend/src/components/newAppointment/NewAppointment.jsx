import axios, { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import { product } from "../../providers/product.provider";
import auth from "../../utils/auth";
import "./newAppointment.css";
import { useHistory } from "react-router-dom";

export default function NewAppointment() {
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);

	const [selectedDoctor, setSelectedDoctor] = useState({});

	const value = useContext(product);
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
			data.append("name", "Dr. " + inputs.name);
			data.append("qualification", inputs.qualification);
			data.append("appointmentFee", inputs.appointmentFee);

			data.append("image", file);

			const response = await axios.post(
				process.env.REACT_APP_API_URI + "/api/doctors",
				data,
				{
					headers: {
						"x-auth-token": auth.getToken(),
					},
				}
			);

			console.log(response.data);

			// history.replace("/doctors");
		} catch (err) {
			if (err instanceof AxiosError) {
				// TODO : Add sweet alert
				console.log(err.response.data.message);
			} else {
				console.log(err);
			}
		}
	};

	return (
		<div className="newProduct">
			<h1 className="addProductTitle">New Doctor</h1>
			<form className="addProductForm">
				<div className="addProductItem">
					<label>Doctor</label>
					<select
						name="doctor"
						placeholder="--Select Doctor--"
						value={selectedDoctor.name || "--Select Doctor--"}
						onChange={handleChange}
					>
						<option>Hello World</option>
					</select>
				</div>
				<div className="addProductItem">
					<label>Qualification</label>
					<input
						name="qualification"
						type="text"
						placeholder="description..."
						onChange={handleChange}
					/>
				</div>
				<div className="addProductItem">
					<label>Appointment Fee</label>
					<input
						name="appointmentFee"
						type="number"
						placeholder="300"
						onChange={handleChange}
					/>
				</div>
				<button onClick={handleClick} className="addProductButton">
					Create
				</button>
			</form>
		</div>
	);
}
