import React from "react";

const Feedcard = ({
  feedData: { name, profile, desc, time, post, comments, likes },
}) => {
  return (
    <div>
      <h2>{profile}</h2>
      <h1>{name}</h1>
      <h4>{desc}</h4>
      <h6>{time}</h6>
      <h2>{post}</h2>
      <h5>{comments}</h5>
      <h6>{likes}</h6>
    </div>
  );
};

export default Feedcard;
