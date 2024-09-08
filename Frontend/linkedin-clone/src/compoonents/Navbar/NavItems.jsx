import React from "react";
import Styles from "./navitems.module.css";

const NavItems = ({ data: { title, imageUrl, link, name }, pageClick }) => {
  return (
    <div
      className={Styles.Container}
      onClick={() => {
        pageClick = { pagename: name };
      }}
    >
      <a className="nav-link px-2 link-secondary">
        <div className={Styles.logoContainer}>
          <img src={imageUrl} alt={title} className={Styles.logo} />
        </div>
        <div className={Styles.title}>{title}</div>
      </a>
    </div>
  );
};

export default NavItems;
