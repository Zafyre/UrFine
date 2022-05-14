import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

const Appointments = () => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);

	let appointments;

	useEffect(() => {}, []);

	if (content.length === 0) {
		appointments = (
			<h4>
				You do not have any appointment. Create one
				<Link to="/appointments/new">here</Link>
			</h4>
		);
	} else {
		appointments =
			content &&
			content.map((appointment) => {
				const d = new Date(appointment.appointment_date);
				const date = d.toUTCString();
				return (
					<Link to={`/appointments/${appointment.id}`} key={appointment.id}>
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
			{loading && <span className="spinner-border spinner-border-lg" />}
			<div className="d-flex flex-wrap">{appointments}</div>
		</div>
	);
};

export default Appointments;
