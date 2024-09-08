import React from "react";
import Style from "./JobCard.module.css";

const JobCard = ({ joblist, pages }) => {
  const handleOnClick = () => {
    const desc = joblist;
    const layout = "jobDescription";
    pages(desc, layout);
  };

  return (
    <div className={Style.Container}>
      <div>
        <img
          src="src/assets/icons/building.png"
          alt="company"
          className={Style.imageCard}
        />
      </div>
      <div>
        <ul className={Style.info}>
          <li className={Style.JobTitle} onClick={handleOnClick}>
            {joblist.title || "Java Software Engineer"}
          </li>
          <li className={Style.companyName}>
            {joblist.company.display_name || "company name"}
          </li>
          <li className={Style.location}>
            {joblist.location.display_name ||
              "Gurugram, haryana, india(onsite)"}
          </li>
          <li className={Style.random}>Actively recruiting</li>
        </ul>
      </div>
      <div>
        <img
          src="src/assets/icons/delete.png"
          alt="cross"
          className={Style.cross}
        />
      </div>
    </div>
  );
};

export default JobCard;
