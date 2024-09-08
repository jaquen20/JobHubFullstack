import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./ApplyJobs.module.css";

const ApplyJobs = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const [formValues, setFormValues] = useState({
    fullName: "",
    city: "",
    universityName: "",
    endYear: "",
    startYear: "",
    jobTitle: "",
    jobLocation: "",
    jobTypes: "",
  });

  // const handleOnChange=(e)=>{
  //   const{name, value}=e.target;
  //   setFormValues({...formValues,[name]:value});
  // };

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  const showTab = (n) => {
    const x = document.getElementsByClassName("tab");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = i === n ? "block" : "none";
    }

    document.getElementById("nextBtn").innerHTML =
      n === x.length - 1 ? "Submit" : "Next";
    fixStepIndicator(n);
  };

  const nextPrev = (n) => {
    const x = document.getElementsByClassName("tab");
    if (n === 1 && !validateForm()) return false;
    setCurrentTab((prev) => {
      const newTab = prev + n;
      if (newTab >= x.length) {
        handleSubmit();
        return prev;
      }
      return newTab;
    });
  };

  const validateForm = () => {
    const x = document.getElementsByClassName("tab");
    const y = x[currentTab].getElementsByTagName("input");
    let valid = true;
    for (let i = 0; i < y.length; i++) {
      if (y[i].value === "") {
        y[i].style.borderColor = "red";

        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName("step")[currentTab].style.borderColor =
        "black";
    }
    return valid;
  };

  const fixStepIndicator = (n) => {
    const x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    x[n].style.opacity = " 1";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    // preventDefault();
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
        throw new Error("login failed");
      }
      const data = await response.json();

      if (data.token) {
        onLoginSuccess();
        navigation("/home");
      } else {
        setError("login failed invalid credentials");
      }
    } catch (error) {
      setError("login failled" + error.message);
    }

    console.log("Form submitted:", formValues);
  };

  return (
    <div>
      <p className={Style.headText}>
        your profile helps you to discover new people and oppertunity
      </p>
      <form
        id="regForm"
        onSubmit={(e) => e.preventDefault()}
        className={`${Style.regForm} regForm`}
        // className="regform"
      >
        <div className={`${Style.tab} tab`}>
          <div>
            Email Address*
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
          <div>
            Phone country code*
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
          <div>
            Mobile phone no*
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
          <div className={Style.headingTab}>Resume</div>
          <div className={Style.resumeBody}>
            Be sure to include an updated resume *
            <p>
              <input
                name="location"
                type="file"
                placeholder="Enter current Loaction"
                // value={formValues.city}
                onChange={handleInputChange}
              />
              {/* <button className={Style.uploadButton}>Upload resume</button> */}
            </p>
          </div>
        </div>

        <div className={`${Style.tab} tab`}>
          <div className={Style.headingTab}>Additiional question</div>
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
                name="endYear"
                value={formValues.endYear}
                onChange={handleInputChange}
              />
            </p>
          </div>
        </div>
        <div className={`${Style.tab} tab`}>
          Job titles*
          <p>
            <input
              name="JobTitles"
              placeholder="Ex: Backend Engineer..."
              value={formValues.jobTitle}
              onChange={handleInputChange}
            />
          </p>
          Job Locations*
          <p>
            <input
              type="text"
              name="JobLocation"
              placeholder="Ex: Newyork  USA..."
              value={formValues.jobLocation}
              onChange={handleInputChange}
            />
          </p>
        </div>
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

export default ApplyJobs;
