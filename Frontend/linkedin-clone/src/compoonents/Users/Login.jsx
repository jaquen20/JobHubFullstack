import React, { useState } from "react";
import Styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const handleLogin = () => {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, password: password }),
      });
      if (!response.ok) {
        throw new Error("login failed");
      }
      const data = await response.json();
      console.log(data.message);
      if (data.token) {
        localStorage.setItem("Token", data.token);
        localStorage.setItem("LoggedUserEmail", email);
        console.log(data.Token);
        // onLoginSuccess();
        navigation("/home");
      } else {
        setError("login failed invalid credentials");
      }
    } catch (error) {
      setError("login failled" + error.message);
    }
  };
  return (
    <div className={Styles.Container}>
      <div className={Styles.header}>
        <div className={Styles.linkedin}>JobHub </div>
        <div className={Styles.Sign}>
          <div className={Styles.join}>
            <a href="/signup">join now</a>
          </div>
          <div className={Styles.join}>
            <a href="/signup">sign in</a>
          </div>
        </div>
      </div>

      <div className={Styles.body}>
        <div className={Styles.BGImage}>
          <img
            src="src/assets/images/Header.jpg"
            alt=" image"
            className={Styles.image}
          />
        </div>
        <div className={Styles.formSection}>
          <div className={Styles.RandomText}>
            Welcome to your professional community
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={Styles.InputBox}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={Styles.InputBox}
            />
            <button type="submit" className={Styles.btn}>
              login
            </button>

            {error && <p className="">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
