import React from "react";
import Styles from "./UserMessageCard.module.css";

const UserMessageCard = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <>
      {users.map((user) => (
        <div className={Styles.profileContainer}>
          <div className={Styles.ProfileImage}>
            <img
              src="src/assets/images/Background.jpg"
              alt="hey"
              className={Styles.image}
            />
          </div>
          <div className={Styles.ProfileInfo}>
            <li>
              {/* <h6>{data.fullName}</h6> */}
              <h6>{user.fullName}</h6>
            </li>
            {/* <li>{data.about}</li> */}
            <li>{user.about}</li>
            <li>
              {/* <small>Connected {data.connectionDate} day ago</small> */}
              <small>Connected {user.dates} day ago</small>
            </li>
          </div>
          <div
            key={user.id}
            className={`${Styles.MessageBox} ${
              selectedUser && selectedUser.id === user.id ? Styles.selected : ""
            }`}
            onClick={setSelectedUser(user.users)}
          >
            <p>Message</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserMessageCard;
