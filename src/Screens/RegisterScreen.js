import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Sucess from "../Components/Sucess";
import Error from "../Components/Error";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [sucess, setSucess] = useState();
  async function register() {
    if (password == Cpassword) {
      const user = {
        name,
        email,
        password,
        Cpassword,
      };
      try {
        setLoading(true);
        const result = await axios.post("/api/users/register", user).data;
        setLoading(false);
        setSucess(true);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      console.log("error");
    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {sucess && <Sucess message="Registration Success" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={Cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            <div className="wrapper">
              <button className="btn btn-primary mt-3" onClick={register}>
                {" "}
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterScreen;
