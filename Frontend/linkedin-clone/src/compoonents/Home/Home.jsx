import React, { useCallback, useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import Leftbar from "../Leftbar/Leftbar";
import Middlebar from "../Middle/Middlebar";
import Rightbar from "../Rightbar/Rightbar";
import CommentPage from "../Comment/CommentPage";
import Network from "../Network/Network";
import Connection from "../MyNetwork/Connection";
import JobList from "../Jobs/JobList";
import NotificationPage from "../Notificationn/NotificationPage";
import PostPage from "../Middle/PostPage";
import JobDescription from "../Jobs/JobDescription";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);
  const handleClick = useCallback((currPage, data) => {
    setCurrentPage(currPage);
    setData(data);
  }, []);
  const showPage = useCallback((currentPage) => {
    setCurrentPage(currPage);
    // setData(data);
  }, []);
  const handleDescription = (desc, layout) => {
    setCurrentPage(layout);
    setData(desc);
  };

  // console.log("homedata", data);

  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [education, setEducations] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/user/myProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.details);
          setEducations(data.details.educations);
          console.log(data);
        } else {
          const errorData = response.json;
          setError(errorData.error);
          console.error(errorData);
        }
      } catch (error) {
        setError("un expected error occurred");
        console.error("error", error);
      }
    };
    fetchUserDetails();
  }, []);
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={Styles.Navbar}>
        <Navbar data={user} click={showPage} />
      </div>
      {currentPage == "09" && (
        <div>
          <div className={`${Styles.container}`}>
            <div className={`${Styles.left} ${Styles.block}`}>
              <Leftbar data={user} />
            </div>
            <div className={`${Styles.center} ${Styles.block}`}>
              <Middlebar page={handleClick} />
            </div>

            <div className={`${Styles.right} ${Styles.block}`}>
              <Rightbar />
            </div>
          </div>
        </div>
      )}
      {currentPage == "p" && (
        <div>
          <Connection />
        </div>
      )}
      {!currentPage && (
        <div>
          <JobList ext={handleDescription} />
        </div>
      )}
      {currentPage == "89" && (
        <div>
          <NotificationPage />
        </div>
      )}
      {currentPage == "jobDescription" && (
        <div>
          <JobDescription jobData={data} />
        </div>
      )}

      {currentPage === "comment" && <CommentPage userData={data} />}
    </div>
  );
};

export default Home;
