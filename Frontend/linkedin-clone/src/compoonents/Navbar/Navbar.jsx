import React, { useCallback, useState } from "react";
import Styles from "./Navbar.module.css";
import navData from "../Data/navItems.json";
import NavItems from "./NavItems";
import DropdownProfile from "../Others/DropdownProfile";

const Navbar = ({ data, click }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const ProfileHandleClick = () => {
    setProfileOpen(!isProfileOpen);
  };
  const clickedPage = useCallback((pagename) => {
    page = { pagename };
    // setData(data);
  }, []);

  return (
    <header className={Styles.Container}>
      <img
        src="src/assets/icons/linkedin.png"
        alt="linkedin"
        className={Styles.logo}
      />
      <div className={Styles.searchBar}>
        <form role="search">
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className={Styles.searchBox}
          />
        </form>
      </div>

      <div className={Styles.tabsContainer}>
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {navData.map((data, id) => {
            return <NavItems key={id} data={data} pageClick={clickedPage} />;
          })}

          <div className="dropdown text-end" onClick={ProfileHandleClick}>
            <div
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {data.profileImage ? (
                <img
                  src={`http://localhost:8080/images/${data.profileImage}`}
                  alt="profile"
                  width="35"
                  height="35"
                  className="rounded-circle"
                />
              ) : (
                <img
                  src="src/assets/icons/user.png"
                  alt="profile"
                  width="35"
                  height="35"
                  className="rounded-circle"
                  // className={Styles.image}
                />
              )}
              {/* <img
                src="src/assets/images/profile.png"
                alt="mdo"
                width="35"
                height="35"
                className="rounded-circle"
              /> */}
            </div>
            <div className={Styles.dropDownMenu}>
              {isProfileOpen && <DropdownProfile userdata={data} />}
            </div>
          </div>
          {/* data={userData} */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
