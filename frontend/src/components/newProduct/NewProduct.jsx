import axios, { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import { product } from "../../providers/product.provider";
import auth from "../../utils/auth";
import "./newProduct.css";
import { useHistory } from "react-router-dom";
import { showToast } from "../../utils/toasts";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const value = useContext(product);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let data = new FormData();
      data.append("name", inputs.name);
      data.append("description", inputs.description);
      data.append("price", inputs.price);

      data.append("image", file);

      const response = await axios.post(
        process.env.REACT_APP_API_URI + "/api/products",
        data,
        {
          headers: {
            "x-auth-token": auth.getToken(),
          },
        }
      );

      console.log(response.data);

      value.fetchProducts();

      history.replace("/products");
    } catch (err) {
      if (err instanceof AxiosError) {
        showToast("pls fill all the details", "error");
        console.log(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
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
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
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
