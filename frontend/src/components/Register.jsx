import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios, { AxiosError } from "axios";
import auth from "../utils/auth";
import { order } from "../providers/order.provider";
import { useHistory } from "react-router-dom";
import { showToast } from "../utils/toasts";
import { appointment } from "../providers/appointment.provider";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://cache.desktopnexus.com/thumbseg/1270/1270589-bigthumbnail.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const appointmentValues = useContext(appointment);
  const value = useContext(order);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      await showToast("pls fill all the details", "error");
      return;
    }
    if (confirmPassword !== password) {
      await showToast("passwords dont match", "error");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URI + "/api/auth/register",
        {
          name: firstName + " " + lastName,
          username,
          email,
          password,
        }
      );

      console.log(response);

      auth.setToken(response.data.token, true);
      auth.setUserInfo(response.data.user, true);

      value.fetchOrders();
      appointmentValues.fetchAppointments();
      showToast("user registered", "success");

      history.replace("/");
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
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="first name"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <Input
            placeholder="last name"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <Input
            placeholder="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Input
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Input
            placeholder="confirm password"
            type="password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
