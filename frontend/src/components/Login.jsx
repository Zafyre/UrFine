import axios, { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { appointment } from "../providers/appointment.provider";
import { order } from "../providers/order.provider";
import auth from "../utils/auth";
import { showToast } from "../utils/toasts";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://plantscreative.com/img/containers/main/blog/joe-caione-qo-pif84vxg-unsplash.jpg/b29fcfe8e834611e0d8eed960f396245.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const value = useContext(order);
  const appointmentValues = useContext(appointment);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URI + "/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      auth.setToken(response.data.token, true);
      auth.setUserInfo(response.data.user, true);

      value.fetchOrders();
      appointmentValues.fetchAppointments();
      await showToast("Login Successful", "success", 1200);

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
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
