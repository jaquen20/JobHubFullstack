import React from "react";
import Styles from "./MyConnectionCard.module.css";

const MyConnectionCard = ({ data }) => {
  return (
    <div className={Styles.profileContainer}>
      <div className={Styles.ProfileImage}>
        <img
          src="src/assets/images/Background.jpg"
          alt="hey"
          className={Styles.image}
        />
      </div>
      <div className={Styles.ProfileInfo}>
        <li>
          <h6>{data.fullName}</h6>
          {/* <h6>sandeep verma</h6> */}
        </li>
        <li>{data.about}</li>
        {/* <li>java developer</li> */}
        <li>
          <small>Connected {data.connectionDate} day ago</small>
          {/* <small>Connected 4 day ago</small> */}
        </li>
      </div>
      <div className={Styles.MessageBox}>
        <p>Message</p>
      </div>
      <div className={Styles.dots}>
        {" "}
        <p>...</p>
      </div>
    </div>
  );
};

export default MyConnectionCard;
