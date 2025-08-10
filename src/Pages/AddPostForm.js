import { useState } from "react";
import "../Styles/form.css";
import axios from "axios";
import SuccessPopup from "../Components/SuccessPopup";
import ErrorPopup from "../Components/ErrorPopup";

export default function AddPostForm({ setPosts }) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const validateForm = () => {
    let isTitleValid = true;
    let isBodyValid = true;
    if (title === "") {
      setTitleError("This field is mandatory");
      isTitleValid = false;
    } else {
      setTitleError("");
      isTitleValid = true;
    }

    if (body === "") {
      setBodyError("This field is mandatory");
      isBodyValid = false;
    } else {
      setBodyError("");
      isBodyValid = true;
    }

    //The form valid only if title and body are not empty
    return isTitleValid && isBodyValid;
  };

  function handleAddPost(title, body) {
    const newPost = {
      userId: 200,
      title,
      body,
    };

    setIsLoading(true);

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => {
        console.log(response.data);
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setShowPopup(true);
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowErrorPopup(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let isFormValid = validateForm();
    if (isFormValid) {
      handleAddPost(title, body);
    }
  }
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 class="form-title">Add New Post</h2>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title fot your post"
              className={titleError ? "error-input" : ""}
            />
            {titleError ? <p className="error-msg">{titleError}</p> : ""}
          </div>
          <div className="form-group">
            <label htmlFor="body">Body: </label>
            <textarea
              name="body"
              id="body"
              value={body}
              onChange={handleBodyChange}
              placeholder="Write the body of the post here"
              className={bodyError ? "error-input" : ""}
            />
            {bodyError ? <p className="error-msg">{bodyError}</p> : ""}
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || title.trim() === "" || body.trim() === ""}
            >
              {isLoading ? (
                <>
                  <div className="btn-spinner"></div>
                  Loading...
                </>
              ) : (
                "Add Post"
              )}
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <SuccessPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}

      {showErrorPopup && (
        <ErrorPopup
          showErrorPopup={showErrorPopup}
          setShowErrorPopup={setShowErrorPopup}

        />
      )}
    </>
  );
}
