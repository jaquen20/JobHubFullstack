import React from "react";
import ExperienceCard from "./ExperienceCard";
import Styles from "./Experiences.module.css";

const Experiences = () => {
  return (
    <div className={Styles.Container}>
      <div className={Styles.Industry}>
        <div>
          <img
            src="src/assets/icons/building.png"
            alt=""
            className={Styles.CompanyLogo}
          />
        </div>
        <div>
          <div className={Styles.Role}>Software Engineer</div>
          <div className={Styles.Company}>
            <div className={Styles.CompanyName}>Google</div>
            <li>Full Time</li>
          </div>
          <div className={Styles.Date}>12/2022 - 06/2024</div>
          <div className={Styles.JobType}>onsite</div>
          <div className={Styles.skillsLearned}>Skills </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
