import React, { useEffect, useRef, useState } from "react";
import Styles from "./ApplySteps.module.css";

const Another = ({ job }) => {
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const [formValues, setFormValues] = useState({
    city: "",
    email: "",
    fullName: "",
    headline: "",
    phoneNo: "",
    profileImage: "",
    jobLocation: "",
    jobTypes: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

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
          setData(data.details);
          setFormValues(data.details);
          setProfile(
            `http://localhost:8080/images/${data.details.profileImage}`
          );
          // setUser(data.details);
          // setEducations(data.details.educations);
          console.log(data.details);
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

  const handleSubmit = async (e) => {
    const details = new FormData();
    details.append("username", formValues.fullName);
    details.append("mobileNo", formValues.phoneNo);
    details.append("email", formValues.email);
    details.append("file", formValues.resume);
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/apply/" + 1, {
        method: "POST",
        body: details,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        //   username: formValues.fullName,
        //   resume: formValues.resume,
        //   mobileNo: formValues.phoneNo,
        //   email: formValues.email,

        // }),
      });
      if (response.ok) {
        navigation("/profile");
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

  const fileInput = useRef(null);

  const [file, setFile] = useState(null);
  console.log("Another" + job);

  const handleUpload = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword")
    ) {
      setFile(selectedFile);
      setFormValues({ ...formValues, resume: e.target.files[0] });
    } else {
      alert("please upload a PDF or DOC file");
    }
  };
  const handleViewFile = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, "_blank");
    }
  };
  const handleCancel = () => {
    setFile(null);
  };

  return (
    <div className={Styles.applicationContainer}>
      <header className={Styles.header}>
        <h3>Apply to alright solution</h3>
        <button className={Styles.closeButton}>X</button>
      </header>

      <div className={Styles.contactInfo}>
        <h4>Contact Info</h4>
        <div className={Styles.contactImageSec}>
          <img
            src={
              "http://localhost:8080/images/e3919f91-82e8-4f86-96af-e59e648b643c_sk.jpg"
            }
            alt="jn"
          />
          <img
            src={`http://localhost:8080/images/${formValues.profileImage}`}
            alt="jn"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <line>{formValues.fullName}</line>
            <em>
              {formValues.headline ||
                "Java developer high octane java developer and have very good knowledge in springboot"}
            </em>
          </div>
        </div>

        <div className={Styles.contacts}>
          <div>
            Email Address*
            <p>
              <input
                name="email"
                placeholder="Enter email name..."
                value={formValues.email}
                onChange={handleInputChange}
                // readOnly
              />
            </p>
          </div>
          <div>
            country code*
            <p>
              <input
                name="email"
                placeholder="Enter email name..."
                //  value={formValues.fullName}
                // onChange={handleInputChange}
                // readOnly
              />
            </p>
          </div>
          <div>
            Phone No*
            <p>
              <input
                name="phoneNo"
                placeholder="Enter email name..."
                value={formValues.phoneNo}
                onChange={handleInputChange}
                // readOnly
              />
            </p>
          </div>

          <button>Edit</button>
        </div>
      </div>
      <hr />

      <div className={Styles.resumeSection}>
        <h4>Resume</h4>
        <p>Be sure to include an updated resume</p>
        <div>
          {file && (
            <div className={Styles.resumeFile}>
              <div className={Styles.fileIcon}>PDF</div>
              <div className={Styles.fileInfo}>
                <p>{file.name}</p>
                {/* <p>Uploaded on 8/24/2022</p> */}
              </div>
              <button onClick={handleViewFile} disabled={!file}>
                View
              </button>
              <button onClick={handleCancel} disabled={!file}>
                cancel
              </button>
            </div>
          )}
        </div>
        <input
          type="file"
          accept=".pdf, .doc,.docx"
          onChange={handleFileChange}
          // value={formValues.resume}
          ref={fileInput}
          style={{ display: "none" }}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <hr />

      {/* <div className={Styles.additionalQuestions}>
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
      </div> */}

      {/* <div className={Styles.workAuthorization}>
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
      </div> */}

      <div className={Styles.footer}>
        {/* <label>
          <input type="checkbox" />
          Follow Patriot Holdings to stay up to date with their page.
        </label> */}
        <button className={Styles.submitButton} onClick={handleSubmit}>
          Submit application
        </button>
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

export default Another;
