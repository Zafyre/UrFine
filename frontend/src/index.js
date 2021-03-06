import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./providers/product.provider";
import { DoctorProvider } from "./providers/doctor.provider";
import { OrderProvider } from "./providers/order.provider";
import { AppointmentProvider } from "./providers/appointment.provider";
import { PetProvider } from "./providers/pet.provider";

ReactDOM.render(
  <PetProvider>
    <AppointmentProvider>
      <OrderProvider>
        <DoctorProvider>
          <ProductProvider>
            <Router>
              <App />
            </Router>
          </ProductProvider>
        </DoctorProvider>
      </OrderProvider>
    </AppointmentProvider>
  </PetProvider>,
  document.getElementById("root")
);
