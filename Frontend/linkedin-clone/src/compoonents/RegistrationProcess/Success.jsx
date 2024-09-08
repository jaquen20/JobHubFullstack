import React from "react";
import { useState } from "react";
import Confirmation from "./Confirmation";
import MainForm from "./MainForm";
import PersonalDetails from "./PersonalDetails";
import UserDetails from "./UserDetails";
import Style from "./Success.module.css";

const Success = () => {
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    village: "",
    pin: "",
    city: "",
    state: "",
    country: "",
  });
  const componentList = [
    <MainForm
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,

    <PersonalDetails
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,
    <UserDetails
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,
    <Confirmation
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,
  ];

  return (
    <div className={Style.app}>
      <div className={Style.progressBar}>
        <div
          style={{
            width:
              page === 0
                ? "25%"
                : page === 1
                ? "50%"
                : page === 2
                ? "75%"
                : "100%",
          }}
        ></div>
      </div>
      <div>{componentList[page]}</div>
      {console.log(formData)}
    </div>
  );
};

export default Success;
