import React, { useEffect, useState } from "react";
import Styles from "./Connection.module.css";
import MyConnectionCard from "./MyConnectionCard";

const Connection = () => {
  const [currentPage, setCurrentPage] = useState("");
  const handleConnectionClick = () => {
    setCurrentPage("other");
  };
  const handleReceiveClick = () => {
    setCurrentPage("receive");
  };
  const handleSentClick = () => {
    setCurrentPage("sent");
  };
  const [sendRequestList, setSendRequestList] = useState([]);
  const [receivedRequestList, setReceivedRequestList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [connections, setConnections] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const myConnections = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/myConnections", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error);
          console.error(errorData);
        }
        const data = await response.json();
        setConnections(data.message);
        console.log("This is connection info:", data.message);
      } catch (error) {
        setError("Unexpected error occurred");
        console.error("Error:", error);
      }
    };

    const sendRequestList = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/sendRequestList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error);
          console.error(errorData);
        }
        const data = await response.json();
        setSendRequestList(data.message);
        console.log("This is connection info:", data.message);
      } catch (error) {
        setError("Unexpected error occurred");
        console.error("Error:", error);
      }
    };
    const receiverRequestList = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch(
          "http://localhost:8080/getPendingRequestList",
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
        setReceivedRequestList(data.message);
        console.log("This is connection info:", data.message);
      } catch (error) {
        setError("Unexpected error occurred");
        console.error("Error:", error);
      }
    };

    const fetchUserDetails = async () => {
      setLoading(true);
      await sendRequestList();
      await receiverRequestList();
      await myConnections();
      setLoading(false);
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.BodyContainer}>
      <div className={Styles.leftContainer}>
        <div
          className={Styles.dropdown}
          onClick={handleConnectionClick}
          style={{ background: "white" }}
        >
          <div style={{ background: "white", width: "400px", display: "flex" }}>
            My connections
          </div>
          <div className={Styles.arrow}>
            <img src="src/assets/icons/Arrow.png" alt="myprofile" />
          </div>
        </div>
        <div
          className={Styles.dropdown}
          onClick={handleSentClick}
          style={{ background: "white" }}
        >
          <div style={{ background: "white", width: "400px", display: "flex" }}>
            Request sent
          </div>
          <div className={Styles.arrow}>
            <img src="src/assets/icons/Arrow.png" alt="myprofile" />
          </div>
        </div>
        <div
          className={Styles.dropdown}
          onClick={handleReceiveClick}
          style={{ background: "white" }}
        >
          <div style={{ background: "white", width: "400px", display: "flex" }}>
            Request received
          </div>
          <div className={Styles.arrow}>
            <img src="src/assets/icons/Arrow.png" alt="myprofile" />
          </div>
        </div>
      </div>

      <div className={Styles.rightContainer}>
        <div>
          {currentPage === "receive" && (
            <div className={Styles.loginBox}>
              <div className={Styles.MyConnectionCard}>
                {receivedRequestList.length > 0 ? (
                  receivedRequestList.map((data, id) => (
                    <MyConnectionCard key={id} data={data} />
                  ))
                ) : (
                  <div>No Data present</div>
                )}
              </div>
            </div>
          )}
          {currentPage === "sent" && (
            <div className={Styles.signupBox}>
              <div className={Styles.MyConnectionCard}>
                {sendRequestList.length > 0 ? (
                  sendRequestList.map((data, id) => (
                    <MyConnectionCard key={id} data={data} />
                  ))
                ) : (
                  <div>No Data present</div>
                )}
              </div>
            </div>
          )}
          {currentPage === "other" && (
            <div className={Styles.signupBox}>
              <div className={Styles.MyConnectionCard}>
                {connections.length > 0 ? (
                  connections.map((data, id) => (
                    <MyConnectionCard key={id} data={data} />
                  ))
                ) : (
                  <div>No Data present</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connection;
