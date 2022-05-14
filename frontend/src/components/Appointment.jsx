import React, { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";

const Appointment = () => {
	const [content, setContent] = useState({});
	const [doctor, setDoctor] = useState({});
	const [loading, setLoading] = useState(true);
	const [successful, setSuccessful] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();
	useEffect(() => {}, []);

	const handleClick = () => {};

	if (successful) {
		return <Redirect to="/appointments" />;
	}

	return (
		<div className="container">
			<header className="jumbotron">
				{loading && <span className="spinner-border spinner-border-lg" />}
				{doctor && (
					<div>
						<p>
							Appointment Id: &nbsp;
							{content.id}
						</p>
						<p>
							With &nbsp;
							<Link to={`/doctors/${doctor.id}`}>{doctor.name}</Link>
						</p>
						<p>
							On &nbsp;
							{new Date(content.appointment_date).toUTCString()}
						</p>
						<button
							className="btn btn-primary btn-block"
							type="button"
							onClick={handleClick}
							disabled={loading}
						>
							Delete
						</button>
					</div>
				)}
				{error && <p>{content}</p>}
			</header>
		</div>
	);
};

export default Appointment;
