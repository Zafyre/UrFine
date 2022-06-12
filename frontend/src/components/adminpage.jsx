import React from "react";
import { Link } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";

import DetailButton from "./DetailButton";

const admin = () => {
  return (
    <>
      <center>
        <Link to="/newproduct" style={{ display: "inline-block" }}>
          <DetailButton
            btnTxt="Add Product"
            btnClass="btn-outline-success detailBtn"
          />
        </Link>
        <Link to="/newdoctor" style={{ display: "inline-block" }}>
          <DetailButton
            btnTxt="Add Doctor"
            btnClass="btn-outline-success detailBtn"
          />
        </Link>
        <Link to={"/newpet"}>
          <DetailButton
            btnTxt="Add Pet"
            btnClass="btn-outline-success detailBtn"
          />
        </Link>
      </center>
    </>
  );
};

export default admin;
