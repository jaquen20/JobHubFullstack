import React, { useEffect, useRef, useState } from "react";
import Styles from "./PostJobForm.module.css";

const PostJobForm = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkills, setCurrentSkills] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    companyName: "",
    jobLocation: "",
    workplaceType: "",
    skills: [],
    description: "",
    seniority: "",
    noOfPostReq: "",
  });

  // const addSkills = () => {
  //   if (currentSkills.trim() !== "") {
  //     setSkills([...skills, currentSkills]);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       skills: [...prevData.skills, currentSkills],
  //     }));
  //     setCurrentSkills("");
  //   }
  // };

  const addSkills = () => {
    if (currentSkills.trim() !== "") {
      setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills, currentSkills];
        setFormData((prevData) => ({
          ...prevData,
          skills: updatedSkills,
        }));
        return updatedSkills;
      });
      setCurrentSkills("");
    }
  };

  // const deleteSkills = (index) => {
  //   const updatedSkills = setSkills(skills.filter((_, i) => i !== index));
  //   setSkills(updatedSkills);
  //   setFormData((prevData) => ({ ...prevData, skills: updatedSkills }));
  // };

  const deleteSkills = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = prevSkills.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, skills: updatedSkills }));
      return updatedSkills;
    });
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
      const response = await fetch("http://localhost:8080/addJobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          companyName: formData.companyName,
          jobType: formData.jobType,
          jobLocation: formData.jobLocation,
          workplaceType: formData.workplaceType,
          reqSkills: formData.skills,
          jobDescription: formData.description,
          noOfPostReq: formData.noOfPostReq,
          seniorityLevel: formData.seniority,
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
  // const handleSubmit = () => {
  //   console.log(formData);
  // };

  return (
    <div>
      <div className="container-xl px-4 mt-4">
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Job Post Form</div>
              <div className="card-body">
                <form>
                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (first name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="city">
                        job Title
                      </label>
                      <input
                        className="form-control"
                        id="fieldOfStudy"
                        name="title"
                        type="text"
                        placeholder="Ex Web Developer.. "
                        onChange={handleInputChange}
                        value={formData.title}
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
                        placeholder="Ex Microsoft "
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Workplace Type
                      </label>
                      <div className="form-cotrol">
                        <select
                          className={`${Styles.selectDiv} form-control`}
                          name="workplaceType"
                          value={formData.workplaceType}
                          onChange={handleInputChange}
                        >
                          <option disabled value="">
                            Please choose an option
                          </option>
                          <option value="on-Site">On-Site</option>
                          <option value="Remote">Remote</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Location
                      </label>
                      <input
                        className="form-control"
                        id="location"
                        name="jobLocation"
                        type="text"
                        placeholder="Ex New york"
                        onChange={handleInputChange}
                        value={formData.jobLocation || ""}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        job Type
                      </label>
                      <div className="form-cotrol">
                        <select
                          className={`${Styles.selectDiv} form-control`}
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleInputChange}
                        >
                          <option disabled value="">
                            Please choose an option
                          </option>
                          <option value="full time">Full-time</option>
                          <option value="part time">Part-time</option>
                          <option value="internShip ">internship</option>
                          <option value="contract ">Contract</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="noOfPostReq">
                        No Of post req *
                      </label>
                      <input
                        className="form-control"
                        id="noOfPostReq"
                        name="noOfPostReq"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.noOfPostReq || ""}
                        required
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
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

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Seniority level
                      </label>
                      <div className={`${Styles.selctDiv} form-cotrol`}>
                        <select
                          className={`${Styles.selectDiv} form-control`}
                          name="seniority"
                          value={formData.seniority}
                          onChange={handleInputChange}
                        >
                          <option disabled value="">
                            Please choose an option
                          </option>
                          <option value="Entry level ">Entry level</option>
                          <option value="mid level">Mid level</option>
                          <option value="senior level">senior level</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="fullName">
                      *Description
                    </label>
                    <textarea
                      className="form-control"
                      id="fullName"
                      name="description"
                      rows="8"
                      type="textarea"
                      placeholder="Enter your username"
                      onChange={handleInputChange}
                      value={formData.description}
                    />
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
                    // onClick={handleSubmit}
                  >
                    Cancle
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
