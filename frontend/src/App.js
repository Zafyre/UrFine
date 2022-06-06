import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Error from "./components/Error";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import NewProduct from "./components/newProduct/NewProduct";
import NewDoctor from "./components/newDoctor/NewDoctor";
import Login from "./components/Login";
import Register from "./components/Register";
import Doctors from "./components/Doctors";
import Doctor from "./components/Doctor";
import Appointments from "./components/Appointments";
import NewAppointment from "./components/newAppointment/NewAppointment";
import Appointment from "./components/Appointment";
import Orders from "./components/Orders";
import Order from "./components/Order";
import StripeContainer from "./components/StripeContainer";
import Paymentform from "./components/Paymentform";
import PetDetails from "./components/PetDetails";
import PetList from "./components/PetList";
import NewPet from "./components/newPet/NewPet";

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/products" component={ProductList} />
				<Route exact path="/pets" component={PetList} />
				<Route exact path="/details" component={Details} />
				<Route exact path="/pet-details" component={PetDetails} />
				<Route exact path="/doctors" component={Doctors} />
				<Route exact path="/doctors/:id" component={Doctor} />
				<Route exact path="/newproduct" component={NewProduct} />
				<Route exact path="/newpet" component={NewPet} />
				<Route exact path="/appointments" component={Appointments} />
				<Route exact path="/newappointment" component={NewAppointment} />
				<Route exact path="/appointments/:id" component={Appointment} />
				<Route exact path="/newdoctor" component={NewDoctor} />
				<Route exact path="/orders" component={Orders} />
				<Route exact path="/orders/:id" component={Order} />
				<Route path="/cart" component={Cart} />
				<Route path="/stripecontainer" component={StripeContainer} />
				<Route path="/paymentform" component={Paymentform} />
				<Route component={Error} />
			</Switch>
			<Modal />
		</>
	);
}

export default App;
