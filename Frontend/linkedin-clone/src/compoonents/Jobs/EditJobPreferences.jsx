import React, { useState } from "react";
import Styles from "./EditJobPreferences.module.css";
import "./EditJobPreferences.module.css";

const EditJobPreferences = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [option, setOptions] = useState(["option1", "option2", "option3"]);
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };
  const addLocation = () => {
    if (currentLocation.trim() !== "") {
      setLocations([...locations, currentLocation]);
      setCurrentLocation("");
    }
  };
  const deleteLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };
  const handleQuestionOnChange = (e) => {
    setCurrentQuestion(e.target.value);
  };
  const addQuestion = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion("");
    }
  };
  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
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
            {option.map((option, index) => (
              <div className={Styles.inputGroup}>
                <input type="checkbox" id={option} name={option} />
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
                <input type="checkbox" id={option} name={option} />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button>submit</button>
          <button>cancel</button>
        </div>
      </div>
      {/* <div className={Styles.inputGroup}>
            <input type="checkbox" id="option1" name="option1" />
            <label htmlFor="option1">Option1</label>
          </div>
          <div className={Styles.inputGroup}>
            <input type="checkbox" id="option2" name="option2" />
            <label htmlFor="option2">Option2</label>
          </div> */}
    </div>
  );
};

export default EditJobPreferences;
