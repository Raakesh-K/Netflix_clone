import React, { useContext, useRef, useState } from "react";
import "../styles/register.scss";
import axios from "axios";
import { AuthContext } from "../context/Temp";
import { useNavigate } from "react-router-dom";


export const Register = () => {
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const usernameRef = useRef();
  const passRef = useRef();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // STEP 1: collect email
  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  // STEP 2: register user
  const handleFinish = async (e) => {
  e.preventDefault();

  try {
    await axios.post("/api/auth/register", {
      username: usernameRef.current.value,
      email,
      password: passRef.current.value,
    });
  } catch (err) {
    console.log("Registration failed, redirecting anyway");
  }

  // ✅ ALWAYS go to login page
  navigate("/login");
};


  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
          <button className="loginbutton" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </div>

      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {!email ? (
          // EMAIL STEP
          <div className="input">
            <input
              type="email"
              placeholder="Email address"
              ref={emailRef}
              required
            />
            <button className="registerbutton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          // USERNAME + PASSWORD STEP
          <form className="input" onSubmit={handleFinish}>
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passRef}
              visible
              required
            />
            <button className="registerbutton" >Start</button>
          </form>
        )}
      </div>
    </div>
  );
};
