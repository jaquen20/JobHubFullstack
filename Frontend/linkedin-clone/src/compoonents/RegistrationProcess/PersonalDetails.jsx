import React from "react";
import Style from "./Success.module.css";

const PersonalDetails = ({ page, setPage, formData, setFormData }) => {
  return (
    <div className={Style.card}>
      <div className={Style.stepTitle}>personal details</div>
      <input type="text" placeholder="address" />

      <input
        type="text"
        placeholder="pin"
        value={formData.pin}
        onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
      />
      <input
        type="text"
        placeholder="city"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
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
  );
};

export default PersonalDetails;
