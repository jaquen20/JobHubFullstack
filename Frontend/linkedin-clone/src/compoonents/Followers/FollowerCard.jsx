import React from "react";

const FollowerCard = () => {
  return (
    <div className={Styles.Container}>
      <div className={Styles.ProfileImage}>
        <img
          src="src/assets/icons/delete.png"
          alt="profile"
          className={Styles.image}
        />
      </div>
      <div className={Styles.About}>
        <div className={Styles.name}>Raj VikramAditya</div>
        <div className={Styles.obj}>
          SWE-III @Google | Building takeUForward | youtuber with 500k
          subscriber
        </div>
      </div>
      <div className={Styles.FollowBtn}>
        <div className={Styles.btn}>Following</div>
      </div>
    </div>
  );
};

export default FollowerCard;
