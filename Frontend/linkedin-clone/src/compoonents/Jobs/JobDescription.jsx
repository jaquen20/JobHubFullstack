import React, { useEffect, useState } from "react";
import Styles from "./JobDescription.module.css";

const JobDescription = ({ jobData, page }) => {
  const [skills, setSkills] = useState([]);
  const handleOnClick = () => {
    const data = jobData;
    const pageName = "apply";
    page(pageName, data);
  };

  console.log("desc" + jobData);

  useEffect(() => {
    if (jobData) {
      setSkills(jobData.reqSkills);
    }
  }, [jobData]);
  return (
    <div className={Styles.jobPosting}>
      <header className={Styles.jobHeader}>
        <p className={Styles.title}>
          {jobData.title || "Software Developer Intern, Backend-Integration"}
        </p>
        <img
          src="src/assets/icons/delete.png"
          alt="X"
          style={{
            width: "40px",
            height: "40px",
            justifyContent: "center",
          }}
        />
      </header>

      <div className={Styles.companyDetails}>
        <img src="src/assets/icons/building.png" alt={jobData.companyName} />
        <div>
          {jobData.company.display_name} <br />
          {jobData.location.display_name}
        </div>
      </div>

      <div className={Styles.jobType}>
        <span>
          <img src="src/assets/icons/briefcase.png" alt="hgg" />
          {jobData.contract_type} - {jobData.contract_time}
        </span>
        <span>
          <img src="src/assets/icons/connections.png" alt="hgg" />
          201-500 employee Aderverting Services
        </span>
        <span>
          <img src="src/assets/icons/connections.png" alt="hgg" />
          18 connection 1 school alumni
        </span>
        <span style={{ display: "flex" }}>
          <img src="src/assets/icons/to-do-list.png" alt="hgg" />
          Skills:
          {/* <div style={{ display: "flex" }}>
            {skills.map((skill, index) => (
              <p style={{ margin: "0 10px" }} key={index}>
                {skill}
              </p>
            ))}
          </div> */}
          {/* Css Javascript html softwaare engineering */}
        </span>
      </div>

      <div className={Styles.jobAction}>
        {jobData.redirect_url ? (
          <button onClick={handleOnClick}>Easy Apply</button>
        ) : (
          <a href={jobData.redirect_url}>
            <button onClick={handleOnClick}>Easy Apply</button>
          </a>
        )}

        <button>
          Save <img src="src/assets/icons/bookmark.png" alt="hgg" />
        </button>
      </div>
      <hr />

      <section className={Styles.jobDescription}>
        <h2>About this job</h2>
        <p>{jobData.description}</p>
      </section>
      {/* <div>
        <p className={Styles.qualification}>Qualifications</p>
        <div
          style={{
            display: "flex",
            width: "auto",
            maxHeight: "40px",
          }}
        >
          <img src="src/assets/icons/setting.jpg" alt="x" />
          <p>
            2 skills match your profile. Standout by adding other Skills you
            have
          </p>
          <hr />
        </div>
      </div> */}
      {/* <div className={Styles.skills}>
        <p>Skills associated with the job post</p>
        <li>
          <img src="" alt="X" />
          <p>2 skills on your profie</p>
        </li>
        <li>
          <img src="" alt="X" />
          <p> skills missing on your profie</p>
        </li>
        <div>Show qualification</div>
      </div> */}
      <footer className={Styles.jobAction}>
        <button onClick={handleOnClick}>Apply</button>
        <button>Save</button>
      </footer>
    </div>
  );
};

export default JobDescription;
