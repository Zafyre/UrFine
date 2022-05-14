import axios, { AxiosError } from "axios";
import React, { createContext, useEffect, useState } from "react";
import auth from "../utils/auth";

const appointment = createContext();
const { Provider } = appointment;

const AppointmentProvider = ({ children }) => {
	const [appointments, setAppointments] = useState([]);

	const fetchAppointments = async () => {
		try {
			if (auth.getToken()) {
				const response = await axios.get(
					process.env.REACT_APP_API_URI + "/api/appointments",
					{
						headers: {
							"x-auth-token": auth.getToken(),
						},
					}
				);

				console.log(response.data);

				setAppointments(response.data.appointments);
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.response.data.message);
			} else {
				console.log(err);
			}
		}
	};

	const addAppointment = (newAppointment) => {
		setAppointments((prevState) => {
			return [...prevState, newAppointment];
		});
	};

	const getAppointment = (id) => {
		return appointments.find((appointment) => appointment._id === id);
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	return (
		<Provider
			value={{
				appointments,
				getAppointment,
				addAppointment,
				fetchAppointments,
			}}
		>
			{children}
		</Provider>
	);
};

export { appointment, AppointmentProvider };
