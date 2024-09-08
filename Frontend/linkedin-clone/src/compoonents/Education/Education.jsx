import React from "react";
import Styles from "./Education.module.css";

const Education = ({
  props: {
    universityName,
    degree,
    fieldOfStudy,
    startYear,
    endDate,
    isCompleted,
  },
}) => {
  return (
    <div>
      <div className={Styles.CollegeContainer}>
        <div className={Styles.CollegeLogo}>
          <img
            src="src/assets/images/Profile.png"
            alt="plus"
            className={Styles.image}
          />
        </div>
        <div className={Styles.CollegeInfo}>
          <li>
            <b>{universityName}</b>
          </li>
          <li>{degree}</li>
          <li>
            <small>{startYear}</small>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Education;
