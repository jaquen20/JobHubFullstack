import React, { useEffect, useState } from "react";
import Styles from "./Feed.module.css";
import LikeStyles from "./Like.module.css";
import "./Like.module.css";
import { Link } from "react-router-dom";
import WriteComment from "../Comment/WriteComment";
import Modal from "../Others/Modal";
import CommentPage from "../Comment/CommentPage";

const Feed = ({ project, pageNo }) => {
  const [isChecked, setIschecked] = useState();
  const [IsConnected, setIsConnected] = useState();
  // const [profile, setProfile] = useState("");

  // setProfile(`http://localhost:8080/Uploads/${project.image}`);

  const handleClick = () => {
    const currPage = "comment";
    const data = project;
    pageNo(currPage, data);
  };

  console.log(project.image);

  const [error, setError] = useState("");
  const [isReadeMore, setIsReadMore] = useState(true);
  const [isCommmentOpen, setIsCommentOpen] = useState(false);
  const openComment = () => {
    setIsCommentOpen(!isCommmentOpen);
  };
  const readmore = () => {
    setIsReadMore(!isReadeMore);
  };
  const displayText = isReadeMore
    ? project.contents.slice(0, 80)
    : project.contents;

  const [isFollow, setFollow] = useState(false);
  const followHandle = async (e) => {
    setFollow(!isFollow);
    // const url = isChecked
    //   ? "http://localhost:8080/sendRequest/" + project.userid
    //   : "http://localhost:8080/addReaction/" + project.id;

    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        "http://localhost:8080/sendRequest/" + project.user.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({ id: project.id }),
        }
      );
      if (!response.ok) {
        throw new Error("reaction update failed");
      }
      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        // console.log("reaction added  succesfully" + data.message);
      } else {
        setError("server error");
      }
    } catch (error) {
      setError("unauthorized" + error.message);
    }
  };

  useEffect(() => {
    const getReaction = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch(
          "http://localhost:8080/checkIsLiked/" + project.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIschecked(data);
          // console.log("all check" + data);
        } else {
          const errorData = response.json;

          console.error(errorData);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    getReaction();
  }, [project.id]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await fetch(
          "http://localhost:8080/checkIsConnected/" + project.user.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsConnected(data);

          // console.log("con check" + data);
        } else {
          const errorData = response.json;

          console.error(errorData);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    checkConnection();
  }, [project.user.id]);

  const likeDislike = async (e) => {
    const url = isChecked
      ? "http://localhost:8080/delReaction/" + project.id
      : "http://localhost:8080/addReaction/" + project.id;

    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ id: project.id }),
      });
      if (!response.ok) {
        throw new Error("reaction update failed");
      }
      if (response.ok) {
        const data = await response.json();
        setIschecked(!isChecked);
        console.log("reaction added  succesfully" + data.isLiked);
      } else {
        setError("server error");
      }
    } catch (error) {
      setError("unauthorized" + error.message);
    }
  };

  return (
    <div className={Styles.container}>
      <div
        className={`${Styles.FeedContainer} list-group list-group-flush border-bottom scrollarea`}
      >
        <a
          href="#"
          className="list-group-item list-group-item-action  py-3 lh-sm"
          aria-current="true"
        >
          <div
            className={`${Styles.titleContainer} d-flex w-100 align-items-center justify-content-between`}
          >
            {project.profileImage ? (
              <img
                src={`http://localhost:8080/images/${project.profileImage}`}
                alt="profile"
                // width="35"
                // height="35"
                // className="rounded-circle"
                className={Styles.image}
              />
            ) : (
              <img
                src="src/assets/icons/user.png"
                alt="profile"
                // width="35"
                // height="35"
                // className="rounded-circle"
                className={Styles.image}
              />
            )}
            <div className={Styles.titleCard}>
              <p className={Styles.name}>
                <b>{project.username}</b>
              </p>
              <p className={Styles.about}>{project.about}</p>
              <p className={Styles.time}>{project.dateTime}</p>
            </div>
            <h6 onClick={followHandle}> {IsConnected ? "" : " + connect"}</h6>
          </div>
          <hr />
          <div className={Styles.postContainer}>
            <div className={`${Styles.postText} col-10 mb-1 small`}>
              {displayText}
              <b>
                {" "}
                {project.contents.length > 80 && (
                  <span onClick={readmore}>
                    {isReadeMore ? "...ReadMore" : "..show less"}
                  </span>
                )}
              </b>
            </div>
            {/* `http://localhost:8080/images/${project.image}` */}
            {project.image ? (
              <img
                src={`http://localhost:8080/images/${project.image}`}
                // src="http://localhost:8080/Uploads/e3919f91-82e8-4f86-96af-e59e648b643c_sk.jpg"
                alt="image"
                className={Styles.postImage}
              />
            ) : (
              ""
            )}
          </div>
        </a>
        {/* <hr /> */}
        <div className={Styles.bottomContainer}>
          <ul className={Styles.bottoms}>
            <div className={LikeStyles.likeInput}>
              <input
                type="checkbox"
                id={project.id}
                checked={isChecked ?? false}
                onChange={likeDislike}
                style={{ display: "none" }}
              />
              <label
                htmlFor={project.id}
                className={`${LikeStyles.react} ${
                  isChecked ? LikeStyles.checked : ""
                }`}
              >
                <i data-icon="❤️" className={Styles.icons}></i>
              </label>
            </div>

            <img
              src="src/assets/icons/comment.png"
              alt="comment"
              className={Styles.icons}
              onClick={handleClick}
            />

            <div onClick={openComment}>Comment</div>

            <a href="#" className={Styles.links}>
              <img
                src="src/assets/icons/send.png"
                alt="send"
                className={Styles.icons}
              />
              share
            </a>
          </ul>
        </div>
        {isCommmentOpen && (
          <WriteComment id={project.id} closeChild={openComment} />
        )}
      </div>
    </div>
  );
};

export default Feed;
