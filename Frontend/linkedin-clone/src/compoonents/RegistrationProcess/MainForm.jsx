import React from "react";
import Style from "./Success.module.css";

const MainForm = ({ page, setPage, formData, setFormData }) => {
  return (
    <div>
      <div className={Style.card}>
        <div className={Style.stepTitle}>mainform</div>

        <input
          name="firstName"
          placeholder="First name..."
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <input
          name="lastName"
          placeholder="Last name..."
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainForm;
