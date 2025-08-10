import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Post clicked: ", post.id);
    navigate(`/post-comments/${post.id}`);
  };
  return (
    <div className="post-card-inner" onClick={() => handleClick(post.id)}>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <span className="post-id">Post #{post.id}</span>
      </div>
    </div>
  );
}
