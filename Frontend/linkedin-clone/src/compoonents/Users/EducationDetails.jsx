import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Education.module.css";

const EducationDetails = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkills, setCurrentSkills] = useState("");
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    universityName: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    result: "",
    skills: "",
  });

  const addSkills = () => {
    if (currentSkills.trim() !== "") {
      setSkills([...skills, currentSkills]);
      setCurrentSkills("");
    }
  };
  const deleteSkills = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const handleSkillsOnChange = (e) => {
    setCurrentSkills(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmiut = () => {
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    // e.preventdefaults();
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/addEducations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          universityName: formData.universityName,
          degree: formData.degree,
          fieldOfStudy: formData.fieldOfStudy,
          startYear: formData.startDate,
          endDate: formData.endDate,
          skills: formData.skills,
          result: formData.result,
        }),
      });
      if (response.ok) {
        navigation("/jd");
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
  return (
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Education Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="fullName">
                    School
                  </label>
                  <input
                    className="form-control"
                    id="universityName"
                    name="universityName"
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleInputChange}
                    value={formData.universityName}
                  />
                </div>

                {/* Form Row*/}
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="city">
                      Degree
                    </label>
                    <input
                      className="form-control"
                      id="fieldOfStudy"
                      name="degree"
                      type="text"
                      placeholder="Ex Bachelor's "
                      onChange={handleInputChange}
                      value={formData.degree}
                    />
                  </div>
                  {/* Form Group (last name)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="email">
                      Field Of Study
                    </label>
                    <input
                      className="form-control"
                      id="date"
                      name="fieldOfStudy"
                      type="email"
                      placeholder="Ex computer science"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">
                      Start Date
                    </label>
                    <input
                      className="form-control"
                      id="industry"
                      name="startDate"
                      type="text"
                      placeholder="industry Type"
                      onChange={handleInputChange}
                      value={formData.startDate || ""}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">
                      End Date
                    </label>
                    <input
                      className="form-control"
                      id="industry"
                      name="endDate"
                      type="text"
                      placeholder="industry Type"
                      onChange={handleInputChange}
                      value={formData.endDate || ""}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="phoneNo">
                      Grade
                    </label>
                    <input
                      className="form-control"
                      id="grade"
                      name="result"
                      type="text"
                      placeholder="Grade"
                      onChange={handleInputChange}
                      value={formData.result}
                    />
                  </div>
                  {/* Form Group (birthday)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">
                      Skills
                    </label>

                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        placeholder="enter Skills"
                        className="form-control"
                        name="skills"
                        value={currentSkills}
                        onChange={handleSkillsOnChange}
                      />
                      <button type="button" onClick={addSkills}>
                        Add
                      </button>
                    </div>
                    <div className={Styles.questionList}>
                      {skills.map((skill, index) => (
                        <div key={index} className={Styles.questionItems}>
                          {skill}
                          <img
                            src="src/assets/icons/delete.png"
                            alt="delete"
                            onClick={() => deleteSkills(index)}
                            className={Styles.delImage}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
