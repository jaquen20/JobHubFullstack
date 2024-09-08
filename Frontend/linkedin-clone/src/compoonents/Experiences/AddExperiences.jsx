import React, { useEffect, useState } from "react";
import Styles from "./AddExperiences.module.css";

const AddExperiences = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkills, setCurrentSkills] = useState("");
  const [options, setOptions] = useState(["On-Site", "Hybrid", "Remote"]);
  const [formData, setFormData] = useState({
    title: "",
    employmentType: "",
    companyName: "",
    startDate: "",
    endDate: "",
    location: "",
    locationType: "",
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
  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/addExperience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          companyName: formData.companyName,
          employmentType: formData.employmentType,
          startDate: formData.startDate,
          endDate: formData.endDate,
          location: formData.location,
          locationType: formData.locationType,
        }),
      });
      if (response.ok) {
        navigation("/profile");
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
            <div className="card-header">Experience Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="fullName">
                    *Title
                  </label>
                  <input
                    className="form-control"
                    id="fullName"
                    name="title"
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleInputChange}
                    value={formData.title}
                  />
                </div>

                {/* Form Row*/}
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="city">
                      Employment Type
                    </label>
                    <input
                      className="form-control"
                      id="fieldOfStudy"
                      name="employmentType"
                      type="text"
                      placeholder="Ex Bachelor's "
                      onChange={handleInputChange}
                      value={formData.employmentType}
                    />
                  </div>
                  {/* Form Group (last name)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="email">
                      *Company Name
                    </label>
                    <input
                      className="form-control"
                      id="date"
                      name="companyName"
                      type="email"
                      placeholder="Ex computer science"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">
                      Location
                    </label>
                    <input
                      className="form-control"
                      id="industry"
                      name="location"
                      type="text"
                      placeholder="industry Type"
                      onChange={handleInputChange}
                      value={formData.location || ""}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">
                      Location Type
                    </label>
                    <div className={`${Styles.selctDiv} form-cotrol`}>
                      <select
                        className={`${Styles.selectDiv} form-control`}
                        name="locationType"
                        value={formData.locationType}
                      >
                        <option>Selected box</option>
                        <option>On-Site</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
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
                      type="date"
                      placeholder=" "
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
                      id="month"
                      name="endDate"
                      type="date"
                      onChange={handleInputChange}
                      value={formData.endDate || ""}
                    />
                  </div>
                </div>

                <div className="md-3">
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

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  save Changes
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Cancle
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperiences;
