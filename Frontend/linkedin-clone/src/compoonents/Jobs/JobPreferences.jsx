import React, { useEffect, useState } from "react";
import Styles from "./JobPreferences.module.css";

const JobPreferences = () => {
  const [option, setOptions] = useState(["option1", "option2", "option3"]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locationTypes, setLocationTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/getPreferences", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJobTitles(data.jobTitle);
          setEmploymentTypes(data.employmentTypes);
          setLocationTypes(data.locationTypes);
          setLocations(data.jobLocations);
          setStartDate(data.startDate);
          // setUser(data);

          console.log(data);
        } else {
          const errorData = response.json;
          setError(errorData.error);
          console.error(errorData);
        }
      } catch (error) {
        setError("un expected error occurred");
        console.error("error", error);
      }
    };
    fetchUserDetails();
  }, []);
  // if (error) {
  //   return <div>Error:{error}</div>;
  // }
  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={Styles.jobPreferences}>
      <div className={Styles.header}>
        <img
          src="src/assets/icons/edit.png"
          alt="edit"
          className={Styles.editIcon}
        />
        <img src="" alt="" className={Styles.profileImage} />
        <div>
          <h4>Sandeep kumar verma</h4>

          <p>open to work </p>
        </div>

        <img
          src="src/assets/icons/edit.png"
          alt="edit"
          className={Styles.editIcon}
        />
      </div>
      <div className={Styles.jobDetails}>
        <div className={Styles.jobTitle}>
          <h5>job title</h5>
          <div className={Styles.form}>
            {jobTitles.map((option, index) => (
              <div key={index} className={Styles.inputGroup}>
                <p>{option}. </p>
              </div>
              // <div className={Styles.inputGroup}>
              //   <input type="checkbox" id={option} name={option}  />
              //   <label htmlFor={option}>{option}</label>
              // </div>
            ))}
          </div>
        </div>

        <div className={Styles.jobTitle}>
          <h5>location Types</h5>
          <div className={Styles.form}>
            {locationTypes.map((option, index) => (
              <div className={Styles.inputGroup}>
                <p key={index}>{option}. </p>
              </div>
            ))}
          </div>
        </div>
        <div className={Styles.jobTitle}>
          <h5>Locations (on site)</h5>
          <div className={Styles.form}>
            {locations.map((option, index) => (
              <div className={Styles.inputGroup}>
                <p key={index}>{option}. </p>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.jobTitle}>
          <h5>Start date</h5>
          {startDate || "immediately"}
          {/* <div>
            <input type="checkbox" id={option} name={option} />
            <label>Immediately, I am actively applying </label>
          </div>
          <div>
            <input type="checkbox" id={option} name={option} />
            <label>Immediately, I am actively applying </label>
          </div> */}
        </div>

        <div className={Styles.jobTitle}>
          <h5>Employment types</h5>
          <div className={Styles.form}>
            {employmentTypes.map((option, index) => (
              <div className={Styles.inputGroup}>
                <p key={index}>{option}. </p>
              </div>
            ))}
          </div>
        </div>

        {/* <h5>job title</h5>
        <p>Backend developer . java programmer</p> */}
        {/* <h5>location Types</h5>
        <p>Onsite . Hybrid</p>
        <h5>Locations (on site)</h5>
        <p>Bhubneshwar India </p>
        <h5>Start date</h5>
        <p>Immediately, I am actively applying</p>
        <h5>Employment types</h5>
        <p>Full-time . Internship</p> */}
      </div>
    </div>
  );
};

export default JobPreferences;
