import React from "react";
import styles from "./NewsCard.module.css";

const NewsCard = ({ data }) => {
  return (
    <div>
      <div className={styles.blogCard5}>
        <div className={styles.singleBlog}>
          <div className={styles.blogInfo}>
            <div className={styles.author}>
              {/* <div className={styles.authorPic}>
                <img
                  src="https://source.unsplash.com/YUu9UAcOKZ4"
                  alt="author img"
                />
              </div> */}
              <span>{data.author}</span>
            </div>
            <h6>{data.title}</h6>
            <div className={styles.blogMeta}>
              <span className={styles.blogTag}>TECHNOLOGY</span>
              <div className={styles.date}>
                <span>{data.publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
