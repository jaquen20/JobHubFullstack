import React, { useEffect, useState } from "react";
import Styles from "./CommentPage.module.css";
import Feed from "../Feed/Feed";
import CommentCard from "./CommentCard";
import WriteComment from "./WriteComment";
import { useLocation } from "react-router-dom";
const CommentPage = ({ userData }) => {
  if (!userData || userData.length === 0) {
    return <div>no comments available</div>;
  }

  const [commentList, setComment] = useState([]);

  console.log("comment page :", userData);

  const [isFollow, setFollow] = useState(false);
  const followHandle = () => {
    setFollow(!isFollow);
  };
  useEffect(() => {
    if (userData) {
      setComment(userData.commentList);
    }
  }, [userData]);

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
            {userData.profileImage ? (
              <img
                src={`http://localhost:8080/images/${userData.profileImage}`}
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
            {/* <img
              src="src/assets/images/profile.png"
              alt="avatar"
              className={Styles.image}
            /> */}
            <div className={Styles.titleCard}>
              <p className={Styles.name}>
                <b>{userData.username}</b>
              </p>
              <p className={Styles.about}>{userData.about}</p>
              <p className={Styles.time}>{userData.dateTime}</p>
            </div>
          </div>
          <hr />
          <div className={Styles.postContainer}>
            <div className={`${Styles.postText} col-10 mb-1 small`}>
              {userData.contents}
            </div>
            {userData.image ? (
              <img
                src={`http://localhost:8080/images/${userData.image}`}
                alt="profile"
                // width="35"
                // height="35"
                // className="rounded-circle"
                className={Styles.postImage}
              />
            ) : (
              <img
                src="src/assets/icons/user.png"
                alt="profile"
                // width="35"
                // height="35"
                // className="rounded-circle"
                className={Styles.postImage}
              />
            )}
            {/* <img
              src="src/assets/images/Background.jpg"
              alt="image"
              className={Styles.postImage}
            /> */}
          </div>
        </a>
        {/* <hr /> */}
        <div className={Styles.bottomContainer}>
          <ul className={Styles.bottoms}>
            <a href="#" className={Styles.links}>
              <img
                src="src/assets/icons/like.png"
                alt="like"
                className={Styles.icons}
              />
              Like
            </a>
            <a href="#" className={Styles.links}>
              <img
                src="src/assets/icons/comment.png"
                alt="comment"
                className={Styles.icons}
              />
              comment
            </a>
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
      </div>
      <div className={Styles.commmentContainer}>
        {commentList !== null ? (
          commentList.map((comments, id) => (
            <CommentCard key={id} CommentData={comments} />
          ))
        ) : (
          <div>No Data present</div>
        )}
      </div>
    </div>
  );
};

export default CommentPage;
