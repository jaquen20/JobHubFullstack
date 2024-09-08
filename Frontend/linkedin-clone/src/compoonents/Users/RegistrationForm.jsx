import React, { useEffect, useState } from "react";
import Style from "./RegistrationDetails.module.css";
import { useNavigate } from "react-router-dom";
// import "./RegistrationDetails.module.css";

const RegistrationForm = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigate();

  const [formValues, setFormValues] = useState({
    fullName: "",
    city: "",
    universityName: "",
    startYear: "",
    endDate: "",
    jobTitle: "",
    jobLocation: "",
  });

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  const showTab = (n) => {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = i === n ? "block" : "none";
    }
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
      nextBtn.innerHTML = n === tabs.length - 1 ? "Submit" : "Next";
    }
    fixStepIndicator(n);
  };

  const nextPrev = (n) => {
    const tabs = document.getElementsByClassName("tab");
    if (n === 1 && !validateForm()) return;
    setCurrentTab((prev) => {
      const newTab = prev + n;
      if (newTab >= tabs.length) {
        handleSubmit();
        return prev;
      }
      return newTab;
    });
  };

  const validateForm = () => {
    const tabs = document.getElementsByClassName("tab");
    const inputs = tabs[currentTab].getElementsByTagName("input");
    let valid = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        inputs[i].style.borderColor = "red";
        valid = false;
      }
    }
    if (valid) {
      const steps = document.getElementsByClassName("step");
      if (steps[currentTab]) {
        steps[currentTab].style.borderColor = "black";
      }
    }
    return valid;
  };

  const fixStepIndicator = (n) => {
    const steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
      steps[i].className = steps[i].className.replace(" active", "");
    }
    if (steps[n]) {
      steps[n].style.opacity = "1";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/user/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();

      if (data.token) {
        // Assuming onLoginSuccess() function handles successful login
        onLoginSuccess();
        navigation("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className={Style.headText}>
        Your profile helps you to discover new people and opportunities
      </p>
      <form
        id="regForm"
        onSubmit={(e) => e.preventDefault()}
        className={`${Style.regForm} regForm`}
      >
        {/* Form tabs */}
        <div className={`${Style.tab} tab`}>
          <div>
            Full Name*
            <p>
              <input
                name="fullName"
                placeholder="Enter full name..."
                value={formValues.fullName}
                onChange={handleInputChange}
                required
              />
            </p>
          </div>
        </div>
        <div className={`${Style.tab} tab`}>
          Location*
          <p>
            <input
              name="city"
              placeholder="Enter current location..."
              value={formValues.city}
              onChange={handleInputChange}
              required
            />
          </p>
        </div>
        <div className={`${Style.tab} tab`}>
          School or College/University*
          <p>
            <input
              name="universityName"
              value={formValues.universityName}
              onChange={handleInputChange}
            />
          </p>
          <div className={Style.universityDates}>
            <p>
              Start year*
              <input
                name="startYear"
                value={formValues.startYear}
                onChange={handleInputChange}
              />
            </p>
            <p>
              End year*
              <input
                name="endDate"
                value={formValues.endDate}
                onChange={handleInputChange}
              />
            </p>
          </div>
        </div>
        <div className={`${Style.tab} tab`}>
          Job title*
          <p>
            <input
              name="jobTitle"
              placeholder="Ex: Backend Engineer..."
              value={formValues.jobTitle}
              onChange={handleInputChange}
            />
          </p>
          Job Location*
          <p>
            <input
              name="jobLocation"
              placeholder="Ex: New York, USA..."
              value={formValues.jobLocation}
              onChange={handleInputChange}
            />
          </p>
        </div>
        {/* Next button */}
        <div className={Style.BtnContainer}>
          <div className={Style.btn}>
            <button
              type="button"
              id="nextBtn"
              onClick={() => nextPrev(1)}
              className={Style.nextBtn}
            >
              Next
            </button>
          </div>
        </div>
        {/* Step indicators */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <span className={`${Style.step} step`}></span>
          <span className={`${Style.step} step`}></span>
          <span className={`${Style.step} step`}></span>
          <span className={`${Style.step} step`}></span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
