import React, { useEffect, useState } from "react";
import Styles from "./ProfileEditor.module.css";
import "./ProfileEditor.module.css";
import { useNavigate } from "react-router-dom";

const ProfileEditor = () => {
  const [error, setError] = useState("");
  const [universityName, setUniversityName] = useState([]);
  const [option, setOptions] = useState(["option"]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    headline: "",
    industry: "",
    school: "",
    city: "",
    email: "",
    webLink: "",
    image: "",
  });
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
          setFormData(data.details);
          // console.log(formData);
          setUniversityName(data.details.educations || []);
          // setEducations(data.details.educations);
          // console.log(data.details.educations);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNo: formData.phoneNo,
          email: formData.email,
          city: formData.city,
          headline: formData.headline,
          school: formData.school,
          webLink: formData.webLink,
        }),
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
  const handleImageInput = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) {
      console.error("no image selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/user/upload", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        // navigation("/profile");
      } else {
        const errorData = response.json;
        setError(errorData.error);
        // console.error(errorData);
      }
    } catch (error) {
      setError("un expected error occurred");
      console.error("error", error);
    }
  };
  const handleImageSubmitr = () => {
    const ImageData = new FormData();
    ImageData.append("file", selectedImage);
    console.log(selectedImage);
    console.log(ImageData);
  };

  return (
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <form encType="multipart/form-data">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="src/assets/images/profile.png"
                  alt="image1"
                />

                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* Profile picture upload button*/}
                <input
                  type="file"
                  onChange={handleImageInput}
                  // value={formData.image}
                  name="image"
                  accept="image/*"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleImageSubmit}
                >
                  Upload new image
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="fullName">
                    FullName
                  </label>
                  <input
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleInputChange}
                    value={formData.fullName}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="headline">
                    Headline*
                  </label>
                  <input
                    className="form-control"
                    id="headline"
                    name="headline"
                    type="text"
                    placeholder="enter bio"
                    onChange={handleInputChange}
                    value={formData.headline}
                  />
                </div>
                {/* Form Row*/}
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="city">
                      Location
                    </label>
                    <input
                      className="form-control"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Enter your Location "
                      onChange={handleInputChange}
                      value={formData.city}
                    />
                  </div>
                  {/* Form Group (last name)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="email">
                      email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email.."
                      readOnly
                      value={formData.email}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="school">
                      School
                    </label>
                    <select
                      name="school"
                      className={Styles.employmentType}
                      required
                      value={formData.school || ""}
                      onChange={handleInputChange}
                    >
                      {universityName === null ? (
                        <option value="">No value </option>
                      ) : (
                        universityName.map((option, index) => (
                          <option key={index} value={option.universityName}>
                            {option.universityName}{" "}
                          </option>
                        ))
                      )}
                    </select>
                    {/* <input
                      className="form-control"
                      id="school"
                      type="text"
                      placeholder="School/university..."
                      onChange={handleInputChange}
                      value={formData.school}
                    /> */}
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">
                      industry type
                    </label>
                    <input
                      className="form-control"
                      id="industry"
                      name="industry"
                      type="text"
                      placeholder="industry Type"
                      onChange={handleInputChange}
                      value={formData.industry || ""}
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="phoneNo">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      type="tel"
                      placeholder="Enter your phone number"
                      onChange={handleInputChange}
                      value={formData.phoneNo}
                    />
                  </div>
                  {/* Form Group (birthday)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">
                      Website
                    </label>
                    <input
                      className="form-control"
                      id="inputBirthday"
                      type="text"
                      name="webLink"
                      placeholder="Enter link to your portfolio"
                      onChange={handleInputChange}
                      value={formData.webLink}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
