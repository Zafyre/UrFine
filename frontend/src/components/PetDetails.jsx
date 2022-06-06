import React, { useContext } from "react";

// import {storePets} from "../data.js";
import DetailButton from "./DetailButton";
import { Link } from "react-router-dom";
import { pet } from "../providers/pet.provider";

const PetDetails = (props) => {
	const value = useContext(pet);

	return (
		<div className="container">
			<div className="my-5" style={{ textAlign: "center" }}>
				<h1>{value.detailPet.title}</h1>
			</div>
			<div className="row mb-5">
				<div className="col-md-6">
					<img
						src={process.env.REACT_APP_API_URI + value.detailPet.image}
						className="img-fluid"
						alt="pet"
					/>
				</div>
				<div className="col-md-6">
					<h2>Name: {value.detailPet.name}</h2>
					<h4 style={{ color: "#30475e" }}>
						Price: <i className="fas fa-rupee-sign"></i>
						{value.detailPet.price}
					</h4>
					<h6>
						<b>Pet Info: </b>
					</h6>
					<p>{value.detailPet.description}</p>
					<div className="row">
						<div className="col-auto">
							<Link to="/pets">
								<DetailButton
									btnTxt="Back to Pets"
									btnClass="btn-outline-primary detailBtn"
								/>
							</Link>
						</div>
						<div
							className="col-auto"
							onClick={(e) => {
								e.preventDefault();
								value.addToCart(value.detailPet._id);
							}}
						>
							<Link to="/cart">
								<DetailButton
									btnTxt={value.detailPet.inCart ? "In Cart" : "Add to Cart"}
									disabled={value.detailPet.inCart ? true : false}
									btnClass="btn-outline-warning detailBtn"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PetDetails;
