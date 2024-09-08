import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WriteComment = ({ id, closeChild }) => {
  const [comment, setComment] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/comments/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contents: comment }),
      });
      if (!response.ok) {
        throw new Error("login failed");
      }
      if (response.ok) {
        closeChild;
        console.log("comment added  succesfully" + comment);
      } else {
        setError("login failed invalid credentials");
      }
    } catch (error) {
      setError("login failled" + error.message);
    }
  };

  return (
    <div>
      <div class="bg-light p-2">
        <div class="d-flex flex-row align-items-start">
          <img
            class="rounded-circle"
            src="src/assets/images/profile.png"
            width="40"
          />
          <form action="" method="post">
            <textarea
              class="form-control ml-1 shadow-none textarea"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write comments..."
              required
            />
          </form>
        </div>
        <div class="mt-2 text-right">
          <button
            class="btn btn-primary btn-sm shadow-none"
            type="button"
            onClick={handleSubmit}
          >
            Post comment
          </button>
          <button
            class="btn btn-outline-primary btn-sm ml-1 shadow-none"
            type="button"
            onClick={closeChild}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
