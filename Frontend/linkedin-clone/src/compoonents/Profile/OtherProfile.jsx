import React, { useEffect, useState } from "react";
import Styles from "./OtherProfile.module.css";

const OtherProfile = () => {
  const handleEditClick = () => {
    page("profileEditor");
  };
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [education, setEducations] = useState([]);
  // const [user, setuser] = useState("");

  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={Styles.ProfileContainer}>
        <div className={Styles.parent}>
          <img
            src="src/assets/images/Background.jpg"
            alt=""
            className={Styles.banner}
          />
          <div className={Styles.image}>
            {user.profileImage ? (
              <img
                src={`http://localhost:8080/images/${user.profileImage}`}
                alt="profile"
                className={Styles.profileImage}
              />
            ) : (
              <img
                src="src/assets/icons/user.png"
                alt="profile"
                className={Styles.profileImage}
              />
            )}
            {/* <img
              src="src/assets/images/profile.png"
              alt="myprofile"
              className={Styles.profileImage}
            /> */}
          </div>
        </div>
        <div className={Styles.details}>
          <h5>
            <b>{user.fullName}</b>
            <img
              src="src/assets/icons/editPen.png"
              alt="edit"
              className={Styles.editIcon}
              onClick={handleEditClick}
            />
          </h5>
          <p>
            {user.headline}
            java developer|proficient in Springboot and jpa| Passionate about
            Crafting and Optimizing Java Application| MCA24
          </p>
          <p className={Styles.smallText}>Student at {user.school}</p>
          <p className={Styles.smallText}>{user.city}</p>
          <a href="#" className={Styles.connections}>
            {user.connectionNo} connections
          </a>
          <p>mutual connection</p>
          <div className={Styles.messageContainer}>
            <a href="#" className={Styles.links}>
              <div className={Styles.message}>
                <img
                  src="src/assets/icons/send.png"
                  alt="myprofile"
                  className={Styles.messageImage}
                />
                <h6>Message</h6>
              </div>
            </a>
            <a href="#" className={Styles.links}>
              <div className={Styles.message}>
                <img
                  src="src/assets/icons/send.png"
                  alt="myprofile"
                  className={Styles.messageImage}
                />
                <h6>Follow</h6>
              </div>
            </a>
            <div className={Styles.circle}>
              <a href="#">...</a>
            </div>
          </div>
          <div className={Styles.jobDescription}>this is about me</div>
        </div>
      </div>

      {user.experiences ? (
        <div style={{ margin: "10px" }}>
          <Experiences page={page} />
        </div>
      ) : (
        ""
      )}

      <div className={Styles.EducationContainer}>
        <div className={Styles.EducationTop}>
          <div className={Styles.Education}>
            <h4>Educations</h4>
          </div>
          <div className={Styles.Edit}>
            <img
              src="src/assets/icons/delete.png"
              alt="plus"
              className={Styles.logo}
            />
            <img
              src="src/assets/icons/delete.png"
              alt="plus"
              className={Styles.logo}
            />
          </div>
        </div>
        {education.map((edu, id) => {
          return <Education key={id} props={edu} page={page} />;
        })}
      </div>
      <br />

      {/* <div className={Styles.CertificateContainer}>
        <div className={Styles.CertificateTop}>
          <div className={Styles.Certificates}>
            <h4>License & Certification</h4>
          </div>
          <div className={Styles.Edit}>
            <img
              src="src/assets/icons/delete.png"
              alt="plus"
              className={Styles.logo}
            />
            <img
              src="src/assets/icons/edit.png"
              alt="plus"
              className={Styles.logo}
            />
          </div>
        </div>
        {/* <Certificates /> */}
      {/* </div> */}
    </div>
  );
};

export default OtherProfile;
