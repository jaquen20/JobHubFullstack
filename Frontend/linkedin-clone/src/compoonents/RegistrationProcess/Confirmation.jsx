import React from "react";
import Style from "./Success.module.css";

const Confirmation = ({ page, setPage, formData, setFormData }) => {
  return (
    <div>
      {" "}
      <div className={Style.card}>
        <div className={Style.stepTitle}>confirmation box</div>
        <input type="text" placeholder="address" />

        <input
          type="text"
          placeholder="state"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />
        <button
          onClick={() => {
            alert("form submitted successfully");
          }}
        >
          submit
        </button>
        <br />
        <button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          previous
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
