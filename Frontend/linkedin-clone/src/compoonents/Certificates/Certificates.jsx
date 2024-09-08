import React from "react";
import Styles from "./Certificates.module.css";

const Certificates = () => {
  return (
    <div>
      <div className={Styles.CertificateContainer}>
        <div className={Styles.InstituteLogo}>
          <img
            src="src/assets/images/Profile.png"
            alt="plus"
            className={Styles.image}
          />
        </div>
        <div className={Styles.CertificateInfo}>
          <li>
            <b>Java Spring framework 6 with Spring Security </b>
          </li>
          <li>udemy</li>
          <li>
            <small>Issued Dec 2022</small>
          </li>
          <li>Credential ID:</li>
          <li className={Styles.CredentialLink}>
            <a href="#">
              Show Credential{" "}
              <img
                src="src/assets/icons/arrow.png"
                alt="arrrow"
                className={Styles.logo}
              />
            </a>
          </li>

          <div className={Styles.CertificateLicence}>
            <div>
              <img
                src="src/assets/images/Background.jpg"
                alt="Image"
                className={Styles.image}
              />
            </div>
            <div>Java Spring framework 6 with Spring Security</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
