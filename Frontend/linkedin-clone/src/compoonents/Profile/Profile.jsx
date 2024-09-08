import React, { useEffect, useState } from "react";
import Styles from "./Profile.module.css";
import Education from "../Education/Education";
import Certificates from "../Certificates/Certificates";
import Experiences from "../Experiences/Experiences";

const Profile = ({ page }) => {
  // const[component,setComponent]=useState(null)
  const handleEditClick = () => {
    page("profileEditor");
  };
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [education, setEducations] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/user/myProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.details);
          setEducations(data.details.educations);
          console.log(data);
        } else {
          const errorData = response.json;
          setError(errorData.error);
          console.error(errorData);
        }
      } catch (error) {
        setError("un expected error occurred");
        console.error("error", error);
      }
    };
    fetchUserDetails();
  }, []);
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.ProfileContainer}>
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
          <p className={Styles.smallText}>Student at {user.school}BIT </p>
          <p className={Styles.smallText}>{user.city}</p>
          <a href="#" className={Styles.connections}>
            {user.connectionNo} connections
          </a>
          {/* <p>mutual connection</p>
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
          <div className={Styles.jobDescription}>this is about me</div> */}
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
              src="src/assets/icons/editpen.png"
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

export default Profile;
