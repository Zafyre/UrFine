import axios, { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import auth from "../../utils/auth";
import "./newAppointment.css";
import { useHistory } from "react-router-dom";
import { appointment } from "../../providers/appointment.provider";
import { doctor } from "../../providers/doctor.provider";
import { showToast } from "../../utils/toasts";

export default function NewAppointment() {
  const [inputs, setInputs] = useState({});

  const value = useContext(doctor);
  const appointmentValue = useContext(appointment);
  const history = useHistory();

  const [selectedDoctor, setSelectedDoctor] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URI + "/api/appointments",
        {
          doctor: selectedDoctor._id,
          time: Date.parse(inputs.time),
        },
        {
          headers: {
            "x-auth-token": auth.getToken(),
          },
        }
      );

      console.log(response.data);

      appointmentValue.addAppointment(response.data.appointment);
      showToast("appointment created successfully", "success");

      history.replace("/appointments");
    } catch (err) {
      if (err instanceof AxiosError) {
        // TODO : Add sweet alert
        console.log(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Appointment</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Doctor</label>
          <select
            name="doctor"
            placeholder="--Select Doctor--"
            value={selectedDoctor._id || ""}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              const doc = value.getDoctor(e.target.value);
              setSelectedDoctor(doc);
            }}
          >
            <option value="" disabled hidden>
              --Select Doctor--
            </option>
            {value.doctors.map((doctor) => {
              return (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="addProductItem">
          <label>Appointment Time</label>
          <input
            name="time"
            type="datetime-local"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Appointment Fee</label>
          <input
            name="appointmentFee"
            type="number"
            placeholder={selectedDoctor.appointmentFee}
            disabled
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
