import React, { useContext } from "react";
// import {storePets} from "../data";
import { pet } from "../providers/pet.provider";
import DetailButton from "./DetailButton";
import { Link } from "react-router-dom";
import Pet from "./Pet";

const PetList = (props) => {
  const value = useContext(pet);
  const petItems = value.pets.map((pet) => {
    return (
      <Pet
        key={pet._id}
        id={pet._id}
        img={pet.image}
        title={pet.name}
        price={pet.price}
        breed={pet.breed}
        inCart={pet.inCart}
      />
    );
  });
  return (
    <div className="container">
      <div className="main-heading-container">
        <h1 className="main-heading">Our Pets</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {petItems}
      </div>
    </div>
  );
};

export default PetList;
