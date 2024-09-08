import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Signup.module.css";

const PersonalDetails = () => {
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const [formValues, setFormValues] = useState({
    city: "",
    fullName: "",
    headline: "",
    phoneNo: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmitu = () => {
    console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/user/createprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city: formValues.city,
          fullName: formValues.fullName,
          headline: formValues.headline,
          phoneNo: formValues.phoneNo,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("signup failed");
      }

      if (response.ok) {
        navigation("/rd");
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
        <div className={Styles.linkedin}>JOBHUB </div>
        <div className={Styles.Sign}>
          <div>Create your profile</div>
        </div>
      </div>

      <div className={Styles.signupForm}>
        <form onSubmit={handleSubmit} className={`${Styles.regForm} regForm`}>
          <p>
            Fullname*
            <input
              type="text"
              placeholder="enter Full name"
              required
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
            />
          </p>
          <p>
            City*
            <input
              type="text"
              placeholder="enter city"
              required
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
            />
          </p>
          <p>
            Mobile no *
            <input
              type="tel"
              placeholder="enter mobile no"
              required
              name="phoneNo"
              value={formValues.phoneNo}
              onChange={handleInputChange}
            />
          </p>
          <p>
            Headline(it show in your profile)*
            <input
              type="text"
              placeholder="enter headline"
              required
              name="headline"
              value={formValues.headline}
              onChange={handleInputChange}
            />
          </p>

          {error && <p className="">{error}</p>}

          <br />

          <div className={Styles.btn}>
            <button
              type="button"
              onClick={handleSubmit}
              className={Styles.click}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
