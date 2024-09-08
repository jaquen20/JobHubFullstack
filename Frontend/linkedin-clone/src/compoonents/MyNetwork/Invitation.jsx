import React, { useState } from "react";
import Styles from "./Invitation.module.css";

const Invitation = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const handleSignupClick = () => {
    // setIsSignup(true);
    setCurrentPage("signup");
  };

  const handleLoginClick = () => {
    // setIsSignup(false);
    setCurrentPage("login");
  };
  const handleOther = () => {
    setCurrentPage("other");
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.btn}>
        <div className={Styles.login} onClick={handleLoginClick}>
          Received
        </div>
        <div className={Styles.signup} onClick={handleSignupClick}>
          Sent
        </div>
        <div className={Styles.signup} onClick={handleOther}>
          other
        </div>
      </div>
      <div
        className={`${Styles.slider} ${
          currentPage === "signup" ? Styles.moveSlider : ""
        }`}
      ></div>
      <div
        className={`${Styles.formSection} ${
          currentPage === "signup" ? Styles.formSectionMove : ""
        }`}
      >
        {currentPage === "signup" && (
          <div className={Styles.loginBox}>this is signup section</div>
        )}
        {currentPage === "login" && (
          <div className={Styles.signupBox}>this is login section</div>
        )}
        {currentPage === "other" && (
          <div className={Styles.otherBox}>this is another section</div>
        )}
        {!currentPage && <div>please select a section</div>}
      </div>
    </div>
  );
};

export default Invitation;
