import React from "react";
import "./CommentPage.module.css";

const CommentCard = ({
  CommentData: { localDateTime, contents, username, image },
}) => {
  return (
    <div>
      <div class="container mt-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-8">
            <div class="d-flex flex-column comment-section">
              <div class="bg-white p-2">
                <div class="d-flex flex-row user-info">
                  {image ? (
                    <img
                      src={`http://localhost:8080/images/${image}`}
                      alt="profile"
                      width="35"
                      height="35"
                      className="rounded-circle"
                      // className={Styles.image}
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
                    class="rounded-circle"
                    src="src/assets/images/profile.png"
                    width="40"
                  /> */}
                  <div class="d-flex flex-column justify-content-start ml-2">
                    <span class="d-block font-weight-bold name">
                      {username}
                    </span>
                    <span class="date text-black-50">
                      Shared publicly - {localDateTime}
                    </span>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="comment-text">{contents}</p>
                </div>
              </div>
              <div class="bg-white">
                <div class="d-flex flex-row fs-12">
                  <div class="like p-2 cursor">
                    <i class="fa fa-thumbs-o-up"></i>
                    <span class="ml-1">Like</span>
                  </div>
                  <div class="like p-2 cursor">
                    <i class="fa fa-commenting-o"></i>
                    <span class="ml-1">Comment</span>
                  </div>
                  <div class="like p-2 cursor">
                    <i class="fa fa-share"></i>
                    <span class="ml-1">Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
