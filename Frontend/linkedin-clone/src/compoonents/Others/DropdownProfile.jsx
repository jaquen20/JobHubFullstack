import React from "react";
import Styles from "./Dropdown.module.css";
import { useAuth } from "../AuthContext";

const DropdownProfile = ({ userdata }) => {
  // const { logout } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem(token);
    // Call the logout function from AuthContext
    // Optionally, redirect to login or home page after logout
    window.location.href = "/login"; // or use useNavigate() from react-router-dom
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.nameImage}>
        {userdata.profileImage ? (
          <img
            src={`http://localhost:8080/images/${userdata.profileImage}`}
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

        <div className={Styles.name}>{userdata.fullName}</div>
      </div>
      <div>{userdata.about}</div>
      <div className={Styles.profileButton}>
        <a href="/profile">view profile</a>
      </div>
      <div className={Styles.profileButton}>
        <a href="/login">Logout</a>
      </div>
    </div>
  );
};

export default DropdownProfile;
