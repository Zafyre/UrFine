import React from 'react';
import {Link} from 'react-router-dom';
import DetailButton from './DetailButton';
// import home from './img1/home';

const Home = (props) => {
  return (
  <div className="jumbotron">
    <h1 className="display-2 text-capitalize"><b>UrFine</b></h1>
    <p className="lead">Your Pets are in Good Hands</p>
    <hr className="my-3"/>
    <Link to="/products">
      <DetailButton btnTxt ="Shop now" btnClass= "btn-outline-light btn-lg homeBtn"/>
    </Link>
  </div>
);
}

export default Home;
