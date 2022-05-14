import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./providers/product.provider";
import { DoctorProvider } from "./providers/doctor.provider";

ReactDOM.render(
	<DoctorProvider>
		<ProductProvider>
			<Router>
				<App />
			</Router>
		</ProductProvider>
	</DoctorProvider>,
	document.getElementById("root")
);
