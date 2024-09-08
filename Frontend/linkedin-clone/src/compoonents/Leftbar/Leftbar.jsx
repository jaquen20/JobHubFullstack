import React from "react";
import Styles from "./Leftbar.module.css";

const Leftbar = ({ data }) => {
  return (
    <div>
      <div
        className={`${Styles.leftContainer} d-flex flex-column flex-shrink-0 p-3 `}
      >
        <div className={Styles.card}>
          {data.profileImage ? (
            <img
              src={`http://localhost:8080/images/${data.profileImage}`}
              alt="profile"
              className={Styles.image}
            />
          ) : (
            <img
              src="src/assets/icons/user.png"
              alt="profile"
              className={Styles.image}
            />
          )}
          <h4>{data.fullName}</h4>
          <p className={Styles.name}>{data.headline}</p>
          <hr />
        </div>
        <div className={Styles.additional}>
          <h6>connections {data.connectionNo}</h6>
          <h6>who viewed your profile 90</h6>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
