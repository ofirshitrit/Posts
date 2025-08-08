import React, { useState, useEffect } from "react";
import PostComment from "../Components/PostComment";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/comments.css";
import '../Styles/loader.css';


export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  //Get Post using the Id from the URL
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("שגיאה בטעינת פרטי הפוסט:", err);
      });
  }, [id]);

  

  //Get the comments of thr post
  useEffect(() => {
    if (!post) return;
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((res) => setComments(res.data))
      .catch((err) =>
        console.error("שגיאה בקבלת התגובות של פוסט :", post.id, err)
      );
  }, [post]);

  if (!post)
    return (
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <div>
            <div className="loading-text">
              Post is loading
              <span className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
            <div className="loading-subtext">
              Please wait while we fetch the content
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="post-details-container">
      <div className="post-details">
        <div className="title-container">
          <h2>{post.title}</h2>
        </div>
        <div className="body-container">
          <p>{post.body}</p>
        </div>
        <div className="comments-container">
          <h3>Comments</h3>
          <ol>
            {comments.map((comment, index) => (
              <li key={comment.id}>
                <PostComment comment={comment} index={index + 1} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
