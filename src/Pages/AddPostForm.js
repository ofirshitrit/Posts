import React, { useState } from "react";

export default function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;
    onAddPost({ title, body });
    setTitle("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title fot your post"
          />
        </div>

        <div className="field">
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={handleBodyChange}
            placeholder="Write the body of the post here"
          />
        </div>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}
