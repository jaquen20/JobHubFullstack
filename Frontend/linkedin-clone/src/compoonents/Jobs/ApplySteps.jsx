import React from "react";
import Styles from "./ApplySteps.module.css";

const ApplySteps = () => {
  return (
    <div className={Styles.applicationContainer}>
      <header className={Styles.header}>
        <h3>Apply to alright solution</h3>
        <button className={Styles.closeButton}>X</button>
      </header>

      <div className={Styles.contactInfo}>
        <h4>Contact Info</h4>
        <div className={Styles.contactImageSec}>
          <img src="" alt="jn" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <line>Sandeep Kumar verma</line>
            <em>
              Java developer high octane java developer and have very good
              knowledge in springboot
            </em>
          </div>
        </div>

        <div className={Styles.contacts}>
          <p>
            Email address
            <br /> hijack@gmail.com
          </p>
          <p>
            Phone country code
            <br />
            India (+91)
          </p>
          <p>
            Mobile phone number
            <br /> 8875597027
          </p>

          <button>Edit</button>
        </div>
      </div>
      <hr />

      <div className={Styles.resumeSection}>
        <h4>Resume</h4>
        <p>Be sure to include an updated resume</p>
        <div className={Styles.resumeFile}>
          <div className={Styles.fileIcon}>PDF</div>
          <div className={Styles.fileInfo}>
            <p>Hannah Baes Resume</p>
            <p>Uploaded on 8/24/2022</p>
          </div>
          <button>View</button>
        </div>
        <button>Edit</button>
      </div>
      <hr />

      <div className={Styles.additionalQuestions}>
        <h4>Additional Questions</h4>
        <p>
          How many years of work experience do you have using QuickBooks?
          <br />
          <span>5</span>
        </p>
        <p>
          What is your level of proficiency in English?
          <br />
          <span>Professional</span>
        </p>
        <p>
          Have you completed the following level of education: Bachelor's
          Degree?
          <br /> <span>Yes</span>
        </p>
        <p>
          Are you comfortable working in an onsite setting? <br />{" "}
          <span>Yes</span>
        </p>
        <button>Edit</button>
      </div>

      <div className={Styles.workAuthorization}>
        <h2>Work authorization</h2>
        <p>
          Will you now, or in the future, require sponsorship for employment
          visa status (e.g. H-1B visa status)? <span>Yes</span>
        </p>
        <p>
          Are you legally authorized to work in the United States?{" "}
          <span>Yes</span>
        </p>
        <button>Edit</button>
      </div>

      <div className={Styles.footer}>
        <label>
          <input type="checkbox" />
          Follow Patriot Holdings to stay up to date with their page.
        </label>
        <button className={Styles.submitButton}>Submit application</button>
        <p>
          We will automatically save your answers and resume to pre-fill future
          applications and improve your experience on LinkedIn.
        </p>
        <p>
          Application powered by LinkedIn | <a href="#">Help Center</a>
        </p>
      </div>
    </div>
  );
};

export default ApplySteps;
