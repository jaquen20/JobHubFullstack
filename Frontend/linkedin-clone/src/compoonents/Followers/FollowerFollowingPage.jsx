import React from "react";
import Styles from "./FollowerFollowingPage.module.css";
import FollowingCard from "./FollowingCard.jsx";

const FollowerFollowingPage = () => {
  return (
    <div className={Styles.Container}>
      <div className={Styles.titleName}>
        Sandeep kumar's Following
        <hr />
      </div>
      <div className={Styles.actionBar}>
        <div>Following</div>
        <div>Followers</div>
      </div>
      <hr />
      <div>you are following 7 people of your network</div>
      <div className={Styles.Card}>
        <FollowingCard />
      </div>
    </div>
  );
};

export default FollowerFollowingPage;
