import React, { useState } from "react";
import Styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, password: password }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("signup failed");
      }
      const data = await response.json();
      console.log(data.message);
      if (data.token) {
        localStorage.setItem("Token", data.token);
        console.log(data.Token);

        navigation("/rdp");
      } else {
        setError("signup failed invalid credentials");
      }
    } catch (error) {
      setError("login failled" + error.message);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <div className={Styles.linkedin}>JobHub </div>
        <div className={Styles.Sign}>
          <div>Join JobHub now -- it's free!</div>
        </div>
      </div>

      <div className={Styles.signupForm}>
        <form onSubmit={handleSubmit} className={`${Styles.regForm} regForm`}>
          <p>
            Email
            <input
              type="text"
              placeholder="enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            Password (5+ character)
            <input
              type="password"
              placeholder="enter email"
              required
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>

          {error && <p className="">{error}</p>}

          <br />
          <small>
            By clicking Agree & Join or Continue, you agree to the JobHub
            <p>
              <a href="#">User Agreement , Privacy Policy</a> and{" "}
              <a href="#">Cookie Policy</a>
            </p>
          </small>
          <div className={Styles.btn}>
            <button type="submit" className={Styles.click}>
              Agree and Join
            </button>
          </div>
        </form>
        <hr />
        <div className={Styles.btn}>
          {/* <button className={Styles.click}>Continue with Google</button> */}
          <p>
            Already on JobHub? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
