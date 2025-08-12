import { useParams } from "react-router-dom";
import "../Styles/comments.css";
import "../Styles/loader.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchComments } from "../api";
import Loader from '../Components/Loader';
import PostComment from '../Components/Comment';


export default function PostComments() {
  const { id } = useParams();

  const {
    data: post,
    error: errorFetchPost,
    isLoading: isPostLoading,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const {
    data: comments,
    error: errorFetchComments,
    isLoading: isCommentsLoading,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
  });

  if (isPostLoading) {
    return (
      <Loader
        text={"Post is loading"}
        subtext={"Please wait while we fetch the content"}
      />
    );
  }

  if (errorFetchPost) {
    return <div className="error-msg">{errorFetchPost.message}</div>;
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
          {isCommentsLoading ? (
            <div className="loading-comments">
              <div className="spinner"></div>
              <p>Loading comments...</p>
            </div>
          ) : errorFetchComments ? (
            <div className="error-msg">{errorFetchComments.message}</div>
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
