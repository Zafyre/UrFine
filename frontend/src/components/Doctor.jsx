import React, { useState, useEffect } from "react";
import { Redirect, Link, useParams } from "react-router-dom";
import classes from "../styles/Doctor.module.css";

const Doctor = () => {
	const { id } = useParams();

	useEffect(() => {}, []);

	return (
		<div className="container">
			<div className="text-center">
				{loading && <span className="spinner-border spinner-border-lg" />}
			</div>
			<div className={classes.Doctor}>
				<img
					src={content.image}
					alt={content.name}
					className={classes.doctorImg}
				/>
				<div>
					<h2>{content.name}</h2>
					<p className={`${classes.badge} ${classes.badgeSecondary}`}>
						Appointment Fee &nbsp;&nbsp;&nbsp;&nbsp; Rs. 300
					</p>
					<p className={classes.badge}>
						Qualification: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{content.qualification}
					</p>
					<p className={classes.badge}>
						Department: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						Medicine
					</p>
					<li>
						<Link
							to={{
								pathname: "/appointments/new",
								doctorId: content.id,
							}}
							className={classes.btn}
						>
							Add Appointment
						</Link>
					</li>
				</div>
			</div>
		</div>
	);
};

export default Doctor;
