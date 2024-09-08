import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import Styles from "./Notification.module.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch(
          "http://localhost:8080/getAllNotification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error);
          console.error(errorData);
        }

        const data = await response.json();
        setNotifications(data.details);
        console.log("This is connection info:", data.message);
      } catch (error) {
        setError("Unexpected error occurred");
        console.error("Error:", error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!notifications) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.BodyContainer}>
      <div className={Styles.Body}>
        <div className={Styles.TitleContainer}>Notifications </div>
        {notifications.length > 0 ? (
          notifications.map((data, id) => (
            <div className={Styles.cardContainer}>
              <NotificationCard key={id} data={data} />
            </div>
          ))
        ) : (
          <div>No Data present</div>
        )}

        {/* <div className={Styles.cardContainer}>
          <NotificationCard />
        </div>
        <div className={Styles.cardContainer}>
          <NotificationCard />
        </div> */}
      </div>
    </div>
  );
};

export default NotificationPage;
