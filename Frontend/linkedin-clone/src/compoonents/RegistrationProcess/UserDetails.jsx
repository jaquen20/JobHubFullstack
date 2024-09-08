import React from "react";
import Style from "./Success.module.css";

const UserDetails = ({ page, setPage, formData, setFormData }) => {
  return (
    <div className={Style.card}>
      <div className={Style.stepTitle}>userdetails</div>
      <input
        type="text"
        placeholder="location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="village"
        value={formData.village}
        onChange={(e) => setFormData({ ...formData, village: e.target.value })}
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

export default UserDetails;
