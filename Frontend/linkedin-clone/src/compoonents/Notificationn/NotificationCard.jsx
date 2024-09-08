import React from "react";
import Styles from "./NotificationCard.module.css";

const NotificationCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className={Styles.notificationBody}>
        <div className={Styles.ImageSection}>
          {data.profiles ? (
            <img
              src={`http://localhost:8080/images/${data.profile}`}
              alt="profile"
              className={Styles.ProfileImage}
            />
          ) : (
            <img
              src="src/assets/icons/user.png"
              alt="profile"
              className={Styles.ProfileImage}
            />
          )}
          {/* <img
            src="src/assets/images/profile.png"
            alt="profile"
            className={Styles.ProfileImage}
          /> */}
        </div>
        <div className={Styles.NotificationMsg}>
          <em>{data.message}</em>
          <div className={Styles.notificationDate}>
            {data.notifyDate}3 days ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
