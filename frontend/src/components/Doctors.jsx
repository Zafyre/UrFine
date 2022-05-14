import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classes from "../styles/Doctors.module.css";
import axios, { AxiosError } from "axios";

const Doctors = () => {
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
				// TODO : Sweet Alert
				console.log(err.response.data.message);
			} else {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		fetchDoctors();
	}, []);

	const doctorsList = doctors.map((doctor) => (
		<div key={doctor._id}>
			<Link to={`/doctors/${doctor._id}`} className={classes.Doctors}>
				<div className="d-flex flex-column align-items-center">
					<img
						src={process.env.REACT_APP_API_URI + doctor.image}
						alt={doctor.name}
						className={`rounded-circle ${classes.img}`}
					/>
					<h5 className={`text-dark p-4 ${classes.border}`}>{doctor.name}</h5>
					<p className="text-secondary mt-3">
						<strong>Qualification:&nbsp;</strong>
						{doctor.qualification}
					</p>
				</div>
			</Link>
		</div>
	));
	return (
		<div className="container text-center">
			<div>
				<h3>LIST OF DOCTORS</h3>
				<p className="text-secondary">Please select a doctor to view details</p>
			</div>
			<Carousel
				additionalTransfrom={0}
				arrows
				autoPlaySpeed={3000}
				centerMode={false}
				className=""
				containerClass="container"
				dotListClass=""
				draggable
				focusOnSelect={false}
				infinite={false}
				itemClass=""
				keyBoardControl
				minimumTouchDrag={80}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024,
						},
						items: 3,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 1,
						partialVisibilityGutter: 30,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 2,
						partialVisibilityGutter: 30,
					},
				}}
				showDots={false}
				sliderClass=""
				slidesToSlide={1}
				swipeable
			>
				{doctorsList}
			</Carousel>
			{/* {message && (
				<div className="form-group">
					<div
						className={
							successful ? "alert alert-success" : "alert alert-danger"
						}
						role="alert"
					>
						{message}
					</div>
				</div>
			)} */}
		</div>
	);
};

export default Doctors;
