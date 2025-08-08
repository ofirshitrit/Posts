import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/form.css";
import axios from "axios";

export default function AddPostForm({ setPosts }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

    setIsLoading(true); // התחלת טעינה

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => {
        console.log(response.data);
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setShowPopup(true); // להציג פופאפ
        setTimeout(() => {
          navigate("/"); // לעבור לדף הבית אחרי שנייה
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error posting data");
      })
      .finally(() => {
        setIsLoading(false); // סיום טעינה
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let isFormValid = validateForm();
    if (isFormValid) {
      handleAddPost(title, body);
      //Go back to the Home page
      navigate("/");
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
          <button type="submit" class="submit-btn">
            Add Post
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="loading-comments">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {showPopup && (
  <div className="popup">
    <p>Post added successfully!</p>
  </div>
)}
    </>
  );
}
