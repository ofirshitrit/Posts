import React, { useState, useEffect } from "react";
import PostComment from "../Components/PostComment";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/comments.css";
import "../Styles/loader.css";
import Loader from "../Components/Loader";

export default function PostComments() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  //Get Post id using the Id from the URL
  useEffect(() => {
    setLoadingPost(true);
    setNotFound(false);

    const timer = setTimeout(() => {
      setLoadingPost(false);
      setNotFound(true);
    }, 30000);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        clearTimeout(timer);
        if (!res.data || Object.keys(res.data).length === 0) {
          setNotFound(true);
        } else {
          setPost(res.data);
          setNotFound(false);
        }
      })
      .catch((err) => {
        setNotFound(true);
      })
      .finally(() => {
        setLoadingPost(false);
      });

    return () => clearTimeout(timer);
  }, [id]);

  //Get the comments of the post
  useEffect(() => {
    if (!post) return;
    setLoadingComments(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((res) => {
        setComments(res.data);
        setLoadingComments(false);
      })
      .catch((err) => {
        setLoadingComments(false);
      });
  }, [post]);

  if (loadingPost) {
    return (
      <Loader text={"Post is loading"} subtext={"Please wait while we fetch the content"} />
    );
  }

  if (notFound) {
    return <div className="post-not-found">Post not found</div>;
  }

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
          {loadingComments ? (
            <div className="loading-comments">
              <div className="spinner"></div>
              <p>Loading comments...</p>
            </div>
          ) : (
            <ol>
              {comments.map((comment, index) => (
                <li key={comment.id}>
                  <PostComment comment={comment} index={index + 1} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
