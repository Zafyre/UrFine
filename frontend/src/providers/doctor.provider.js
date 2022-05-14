import axios, { AxiosError } from "axios";
import React, { useState, useEffect, createContext } from "react";

const doctor = createContext();
const { Provider } = doctor;

const DoctorProvider = ({ children }) => {
	const [doctors, setDoctors] = useState([]);

	const fetchDoctors = async () => {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API_URI + "/api/doctors"
			);

			console.log(response.data);

			setDoctors(response.data.doctors);
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response.data.message);
			} else {
				console.log(err);
			}
		}
	};

	const addDoctor = (newDoctor) => {
		setDoctors((prevState) => {
			return [...prevState, newDoctor];
		});
	};

	const getDoctor = (id) => {
		return doctors.find((doctor) => doctor._id === id);
	};

	useEffect(() => {
		fetchDoctors();
	}, []);

	return (
		<Provider
			value={{
				doctors,
				fetchDoctors,
				addDoctor,
				getDoctor,
			}}
		>
			{children}
		</Provider>
	);
};

export { doctor, DoctorProvider };
