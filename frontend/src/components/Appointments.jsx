import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { appointment } from "../providers/appointment.provider";

const Appointments = () => {
	let appointments;

	const value = useContext(appointment);
	const content = value.appointments;

	if (content.length === 0) {
		appointments = (
			<h4>
				You do not have any appointment. Create one
				<Link to="/newappointment"> here</Link>
			</h4>
		);
	} else {
		appointments =
			content &&
			content.map((appointment) => {
				const d = new Date(appointment.time);
				const date = d.toUTCString();
				return (
					<Link to={`/appointments/${appointment._id}`} key={appointment._id}>
						<div className="card m-4">
							<div className="card-body">
								<p>
									On &nbsp;
									{date}
								</p>
							</div>
						</div>
					</Link>
				);
			});
	}

	return (
		<div className="container text-center">
			<h3>Appointments</h3>
			<div className="d-flex flex-wrap">{appointments}</div>
		</div>
	);
};

export default Appointments;
