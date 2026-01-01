import React, { useContext, useState } from "react";
import "../styles/login.scss";
import axios from "axios";
import { AuthContext } from "../context/Temp";
import { useNavigate } from "react-router-dom";

export const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/auth/login`, {
        email,        // ✅ backend expects this
        password,     // ✅ backend expects this
      });

      login(res.data);
     
    } catch (err) {
      alert("Wrong email or password");
    }
      navigate("/");
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

         
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="loginButton">Sign In</button>

          <span>
            New to Netflix?{" "}
            <b onClick={() => navigate("/register")}>Sign up now</b>
          </span>

          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </small>
        </form>
      </div>
    </div>
  );
};
