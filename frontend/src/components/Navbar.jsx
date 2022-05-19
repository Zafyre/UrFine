import React from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <Link to="/" className="navbar-brand">
        UrFine
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ml-2">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Our Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/doctors" className="nav-link">
              Our Doctors
            </Link>
          </li>
        </ul>
        {auth.getToken() !== null || (
          <Link to="/register" className="ml-auto">
            Register
          </Link>
        )}
        {auth.getToken() !== null || (
          <Link to="/login" className="ml-auto">
            Login
          </Link>
        )}

        {auth.getToken() && (
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li style={{ margin: "5px" }}>
                <Link to="/appointments">
                  <button className="btn">
                    <span className="mr-2">
                      <i className="fas fa-calendar " />
                    </span>
                    My Appointments
                  </button>
                </Link>
              </li>
              <li style={{ margin: "5px" }}>
                <Link to="/orders">
                  <button className="btn">
                    <span className="mr-2">
                      <i className="fas fa-history " />
                    </span>
                    My Orders
                  </button>
                </Link>
              </li>
              <li style={{ margin: "5px" }}>
                <Link to="/cart">
                  <button className="btn">
                    <span className="mr-2">
                      <i className="fas fa-cart-plus " />
                    </span>
                    My Cart
                  </button>
                </Link>
              </li>
              <li style={{ margin: "5px" }}>
                <button
                  onClick={() => {
                    auth.clearAppStorage();
                    window.location.reload(false);
                  }}
                  className="btn"
                >
                  <span className="mr-2">
                    <i className="fas fa-sign-out-alt" />
                  </span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
