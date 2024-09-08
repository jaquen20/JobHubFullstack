import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Styles from "./PostPage.module.css";

const PostPage = () => {
  //   const navigate = Navigate;
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const uploadImage = useRef(null);

  const adjustTextArea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
    adjustTextArea();
  };
  const cancelImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleImageUpload = () => {
    uploadImage.current.click();
  };

  const handleSubmit = async (e) => {
    const formdata = new FormData();
    formdata.append("text", text);
    formdata.append("image", image);
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:8080/post/createNewPost", {
        method: "POST",
        headers: {
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
      if (response.ok) {
        // navigate("/home");
        console.log(response);
      }
    } catch (error) {}
  };

  const createPost = async () => {
    const formdata = new FormData();
    formdata.append("text", text);
    formdata.append("image", image);

    console.log(formdata);
  };

  return (
    <div className={Styles.container}>
      <div>
        <img
          src="src/assets/icons/delete.png"
          alt="X"
          style={{ width: "30px", height: "30px", float: "right" }}
        />
      </div>

      <form onSubmit={handleSubmit} className={Styles.formArea}>
        <textarea
          ref={textareaRef}
          type="text"
          name="text"
          className={Styles.textarea}
          placeholder="Share your thoughts"
          value={text}
          onChange={handleTextChange}
          required
        />

        {preview && (
          <div className={Styles.previewContainer}>
            <img
              src={preview}
              alt="image"
              //   width="200"
              className={Styles.previewImage}
            />
            <img
              src="src/assets/icons/delete.png"
              alt="X"
              style={{ width: "30px", height: "30px", float: "right" }}
              onClick={cancelImage}
            />
          </div>
        )}
        <input
          type="file"
          ref={uploadImage}
          accept="image/*"
          onChange={handleImageChange}
          className={Styles.uploadInput}
        />

        <div style={{ display: "flex-block" }}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={Styles.submitButton}
          >
            submit
          </button>

          <img
            src="src/assets/icons/image.png"
            alt="image"
            onClick={handleImageUpload}
            className={Styles.image}
          />
        </div>
      </form>
    </div>
  );
};

export default PostPage;
