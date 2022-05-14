import axios, { AxiosError } from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link, useParams } from "react-router-dom";
import { doctor } from "../providers/doctor.provider";
import classes from "../styles/Doctor.module.css";

const Doctor = () => {
	const { id } = useParams();

	const value = useContext(doctor);
	const content = value.getDoctor(id);

	return (
		<div className="container">
			<div className={classes.Doctor}>
				<img
					src={process.env.REACT_APP_API_URI + content.image}
					alt={content.name}
					className={classes.doctorImg}
				/>
				<div>
					<h2>{content.name}</h2>
					<p className={`${classes.badge} ${classes.badgeSecondary}`}>
						Appointment Fee &nbsp;&nbsp;&nbsp;&nbsp; Rs.{" "}
						{content.appointmentFee}
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
