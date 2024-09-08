import React, { useEffect, useState } from "react";
import data from "../Data/projectData.json";
import Card from "./Feed/Feedcard.jsx";
import Styles from "./Middle.module.css";
import Feed from "../Feed/Feed.jsx";

const Middlebar = ({ page }) => {
  const [HomeFeed, setFeed] = useState([]);
  const [error, setError] = useState("");
  const [comment, setComment] = useState([]);
  const [postDataContents, setPostContents] = useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch("http://localhost:8080/post/HomeFeed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFeed(data.details);
          setComment(data.details.commentList);
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
  const createPost = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contents: postDataContents }),
      });
      if (response.ok) {
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

  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!HomeFeed) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={Styles.postContainer}>
        <div className={Styles.imgSearch}>
          <div className={Styles.imageContainer}>
            <img
              src="src/assets/icons/linkedin.png"
              alt="linkedin"
              className={Styles.logo}
            />
          </div>
          <div className={Styles.searchBar}>
            <form role="search" style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Start a post.."
                aria-label="Search"
                value={postDataContents}
                onChange={(e) => setPostContents(e.target.value)}
                className={Styles.searchBox}
                required
              />
              <button onClick={createPost}>submit</button>
            </form>
          </div>
        </div>

        <div className={Styles.types}>
          <li>
            <a href="post">
              <img
                src="src/assets/icons/image.png"
                alt="image"
                className={Styles.postlogo}
              />
              Media
            </a>
          </li>
          <li>Event</li>
          <li>
            <img
              src="src/assets/icons/edit.png"
              alt="edit"
              className={Styles.postlogo}
            />
            Write an article
          </li>
        </div>
      </div>

      <br />

      <div className={Styles.feedCard}>
        {HomeFeed.map((project, id) => {
          return <Feed key={id} project={project} pageNo={page} />;
        })}
      </div>
      {/* pages={page} */}
    </div>
  );
};

export default Middlebar;
