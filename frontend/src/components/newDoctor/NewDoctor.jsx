import axios, { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import auth from "../../utils/auth";
import "./newDoctor.css";
import { useHistory } from "react-router-dom";
import { doctor } from "../../providers/doctor.provider";
import { showToast } from "../../utils/toasts";

export default function NewDoctor() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const value = useContext(doctor);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      inputs.name === "" ||
      inputs.qualification === "" ||
      inputs.appointmentFee === "" ||
      file === null
    ) {
      showToast("Pls fill all the details", "error");
      return;
    }

    try {
      let data = new FormData();
      data.append("name", "Dr. " + inputs.name);
      data.append("qualification", inputs.qualification);
      data.append("appointmentFee", inputs.appointmentFee);

      data.append("image", file);

      const response = await axios.post(
        process.env.REACT_APP_API_URI + "/api/doctors",
        data,
        {
          headers: {
            "x-auth-token": auth.getToken(),
          },
        }
      );

      console.log(response.data);

      value.addDoctor(response.data.doctor);

      history.replace("/doctors");
    } catch (err) {
      if (err instanceof AxiosError) {
        showToast(err.response.data.message, "error");
        console.log(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Doctor</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Qualification</label>
          <input
            name="qualification"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Appointment Fee</label>
          <input
            name="appointmentFee"
            type="number"
            placeholder="300"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
