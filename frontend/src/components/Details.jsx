import React, { useContext } from "react";

// import {storeProducts} from "../data.js";
import DetailButton from "./DetailButton";
import { Link } from "react-router-dom";
import { product } from "../providers/product.provider";

const Details = (props) => {
  const value = useContext(product);

  return (
    <div className="container">
      <div className="my-5" style={{ textAlign: "center" }}>
        <h1>{value.detailProduct.title}</h1>
      </div>
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src={process.env.REACT_APP_API_URI + value.detailProduct.image}
            className="img-fluid"
            alt="product"
          />
        </div>
        <div className="col-md-6">
          <h2>Name: {value.detailProduct.name}</h2>
          <h4 style={{ color: "#30475e" }}>
            Price: <i className="fas fa-rupee-sign"></i>
            {value.detailProduct.price}
          </h4>
          <h6>
            <b>Product Info: </b>
          </h6>
          <p>{value.detailProduct.description}</p>
          <div className="row">
            <div className="col-auto">
              <Link to="/products">
                <DetailButton
                  btnTxt="Back to Products"
                  btnClass="btn-outline-primary detailBtn"
                />
              </Link>
            </div>
            <div
              className="col-auto"
              onClick={(e) => {
                e.preventDefault();
                value.addToCart(value.detailProduct._id);
              }}
            >
              <Link to="/cart">
                <DetailButton
                  btnTxt={
                    value.detailProduct.inCart ? "In Cart" : "Add to Cart"
                  }
                  disabled={value.detailProduct.inCart ? true : false}
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

export default Details;
