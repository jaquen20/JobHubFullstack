import React, { useState } from "react";
import Styles from "./JobDetails.module.css";
import { useNavigate } from "react-router-dom";

const JobDetails = () => {
  const navigation = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [option, setOptions] = useState(["full Time", "internship", "partime"]);
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationTypes, setLocationTypes] = useState([
    "On-site",
    "Remote",
    "Hybrid",
  ]); // Example location types
  const [selectedLocationTypes, setSelectedLocationTypes] = useState([]);
  const [formDetails, setFormDetails] = useState({
    jobTitle: [],
    locationTypes: [],
    jobLocations: [],
    employmentTypes: [],
  });

  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };
  const addLocation = () => {
    if (currentLocation.trim() !== "") {
      const updatedLocations = [...locations, currentLocation];
      setLocations(updatedLocations);
      setFormDetails({ ...formDetails, jobLocations: updatedLocations });
      setCurrentLocation("");
    }
  };
  const deleteLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    setFormDetails({ ...formDetails, jobLocations: updatedLocations }); // Update formDetails
  };
  const handleQuestionOnChange = (e) => {
    setCurrentQuestion(e.target.value);
  };
  const addQuestion = () => {
    if (currentQuestion.trim() !== "") {
      const updatedQuestions = [...questions, currentQuestion];
      setQuestions(updatedQuestions);
      setFormDetails({ ...formDetails, jobTitle: updatedQuestions }); // Update formDetails
      setCurrentQuestion("");
    }
  };
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setFormDetails({ ...formDetails, jobTitle: updatedQuestions }); // Update formDetails
  };

  const handleEmploymentChange = (e) => {
    const { name, checked } = e.target;
    const updatedEmploymentTypes = checked
      ? [...formDetails.employmentTypes, name]
      : formDetails.employmentTypes.filter((type) => type !== name);
    setFormDetails({ ...formDetails, employmentTypes: updatedEmploymentTypes });
  };

  const handleLocationTypeChange = (e) => {
    const { name, checked } = e.target;
    const updatedLocationTypes = checked
      ? [...selectedLocationTypes, name]
      : selectedLocationTypes.filter((type) => type !== name);

    setSelectedLocationTypes(updatedLocationTypes);
    setFormDetails({ ...formDetails, locationTypes: updatedLocationTypes }); // Update formDetails
  };

  const submitForm = async () => {
    const apiUrl = "http://localhost:8080/addPreferences"; // Replace with your actual API endpoint

    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDetails), // Sending the form data as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        navigation("/home");
      }

      const data = await response.json();
      console.log("Success:", data); // Handle success (e.g., show a message or redirect)
    } catch (error) {
      console.error("Error:", error); // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className={Styles.container}>
      <h4>Job preferences </h4>
      <div className={Styles.Body}>
        <div className={Styles.jobTitle}>
          <label>
            <p>Job Titles*</p>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="enter questions"
                className={Styles.inputType}
                value={currentQuestion}
                onChange={handleQuestionOnChange}
              />
              <button onClick={addQuestion}>Add</button>
            </div>
          </label>
          <div className={Styles.questionList}>
            {questions.map((question, index) => (
              <div key={index} className={Styles.questionItems}>
                {question}
                <img
                  src="src/assets/icons/delete.png"
                  alt="delete"
                  onClick={() => deleteQuestion(index)}
                  className={Styles.delImage}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={Styles.jobTitle}>
          <p>Location Types</p>
          <div className={Styles.form}>
            {locationTypes.map((option, index) => (
              <div className={Styles.inputGroup}>
                <input
                  type="checkbox"
                  id={option}
                  name={option}
                  value={option}
                  onChange={handleLocationTypeChange}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.jobTitle}>
          <label>
            <p>Location (on-site)*</p>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Add Locations"
                className={Styles.inputType}
                value={currentLocation}
                onChange={handleLocationChange}
              />
              <button onClick={addLocation}>Add</button>
            </div>
          </label>
          <div className={Styles.questionList}>
            {locations.map((location, index) => (
              <div key={index} className={Styles.questionItems}>
                <p>{location} </p>

                <img
                  src="src/assets/icons/delete.png"
                  alt="delete"
                  onClick={() => deleteLocation(index)}
                  className={Styles.delImage}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.jobTitle}>
          <p>Employment Types</p>
          <div className={Styles.form}>
            {option.map((option, index) => (
              <div className={Styles.inputGroup}>
                <input
                  type="checkbox"
                  id={option}
                  name={option}
                  onChange={handleEmploymentChange}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={submitForm}>submit</button>
          <button>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
