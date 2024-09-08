import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Styles from "./JobList.module.css";

const JobList = ({ ext }) => {
  const [Jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchJobsPosted = async () => {
  //     try {
  //       const token = localStorage.getItem("Token");
  //       const response = await fetch("http://localhost:8080/findMeJobs", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setJobs(data);
  //         // console.log(data);
  //       } else {
  //         const errorData = response.json;
  //         setError(errorData.error);
  //         console.error(errorData);
  //       }
  //     } catch (error) {
  //       setError("un expected error occurred");
  //       console.error("error", error);
  //     }
  //   };
  //   fetchJobsPosted();
  // }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/getApiJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
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
    fetchNews();
  }, []);

  return (
    <div className={Styles.BodyContainer}>
      <div className={Styles.LeftPanel}>
        <ul className={Styles.LeftPanelItems}>
          <li>My Jobs</li>
          <li>Applied jobs</li>
          <li>saved jobs</li>
          <li>Interview Prep</li>
          <li>Job Seeker Guidance</li>
        </ul>
        <div className={Styles.postJob}>
          {" "}
          <a href="/postJob">Post a free job</a>
        </div>
      </div>
      <div className={Styles.MidPanel}>
        <li>
          <h4>Job Picks For You</h4>
        </li>
        <li>Based on your profile</li>

        <hr />
        {Jobs.length > 0 ? (
          <div>
            {Jobs.map((job, index) => (
              <div className={Styles.jobCard} key={index}>
                <JobCard joblist={job} pages={ext} />
              </div>
            ))}
          </div>
        ) : (
          <div>No data found</div>
        )}
        {/* {Jobs.map((job, index) => (
          <div className={Styles.jobCard} key={index}>
            <JobCard joblist={job} pages={page} />
          </div>
        ))} */}

        {/* <div className={Styles.jobCard}>
          <JobCard />
        </div> */}
      </div>
      <div className={Styles.RightPanel}>
        <h4>Job Seeker guidance</h4>
        <p>
          Explore our curated guide of expert led courses such as how to improve
          your resumeand grow your network, to help you land your next
          oppertunity
        </p>
      </div>
    </div>
  );
};

export default JobList;
