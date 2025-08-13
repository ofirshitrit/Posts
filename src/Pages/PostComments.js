import { useParams, useLocation  } from "react-router-dom";
import "../Styles/comments.css";
import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api";
import PostComment from '../Components/Comment';


export default function PostComments() {
  const { id } = useParams();
  const location = useLocation();
  const { title, body } = location.state || {};


  const {
    data: comments,
    error: errorFetchComments,
    isLoading: isCommentsLoading,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
  });

  const commentsCount = comments ? comments.length : 0;


  return (
    <div className="post-details-container">
      <div className="post-details">
        <div className="title-container">
          <h2>{title}</h2>
        </div>
        <div className="body-container">
          <p>{body}</p>
        </div>
        <div className="comments-container">
          <h3 style={{ textAlign: commentsCount === 0 ? "center" : "left" }}>Comments</h3>
          {isCommentsLoading ? (
            <div className="loading-comments">
              <div className="spinner"></div>
              <p>Loading comments...</p>
            </div>
          ) : errorFetchComments ? (
            <div className="error-msg">{errorFetchComments.message}</div>
          ) : commentsCount === 0 ? (
            <div className="no-comments-container">This post has no comments yet.</div>
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
