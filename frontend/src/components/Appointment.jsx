import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { appointment } from "../providers/appointment.provider";

const Appointment = () => {
	const { id } = useParams();

	const value = useContext(appointment);
	const content = value.getAppointment(id);

	return (
		<div className="container">
			<div>
				<p>
					Appointment Id: &nbsp;
					{content._id}
				</p>
				<p>
					With &nbsp;
					<Link to={`/doctors/${content.doctor._id}`}>
						{content.doctor.name}
					</Link>
				</p>
				<p>
					On &nbsp;
					{new Date(content.time).toUTCString()}
				</p>
			</div>
		</div>
	);
};

export default Appointment;
