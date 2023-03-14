import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {error && <Error message="Invalid Credentials" />}
          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="wrapper">
              <button className="btn btn-primary mt-3" onClick={Login}>
                {" "}
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginScreen;
