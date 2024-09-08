import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "../Users/Login";
import Styles from "./Rightbar.module.css";
import OtherProfile from "../Profile/OtherProfile";
import NewsCard from "./NewsCard";

const Rightbar = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [headlines, setHeadlines] = useState([]);
  const [education, setEducations] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/techNews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHeadlines(data.articles);

          // console.log(data);
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
  if (error) {
    return (
      <div style={{ justifyContent: "center", margin: "20% 0 30% 0" }}>
        Error:{error}
      </div>
    );
  }
  if (!headlines) {
    return (
      <div style={{ justifyContent: "center", margin: "20% 0 30% 0" }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h2>News</h2>
      <div className={Styles.newsMarquee}>
        <div className={Styles.newsContent}>
          {headlines.map((article, index) => (
            <div className={Styles.newsBlock}>
              <a
                href={article.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewsCard data={article} />
                {/* {article.title} */}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
