import { useNavigate } from "react-router-dom";
import { PencilLine, MessageCircle } from "lucide-react";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post-comments/${post.id}`, {
      state: { title: post.title, body: post.body },
    });
  };

 const handleEditClick = (e) => {
    e.stopPropagation(); 
    navigate(`/add-post`, { state: { post } });
  };

  const handleCommentsClick = (e) => {
    e.stopPropagation();
    navigate(`/post-comments/${post.id}`, {
      state: { title: post.title, body: post.body },
    });
  };
  return (
    <div className="post-card-inner">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <span className="post-id">Post #{post.id}</span>
        <div className="icons-container">
        <div className="tooltip-container" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleEditClick}
            className="icon-button"
            aria-label="Edit Post"
          >
            <PencilLine size={20} />
          </button>
          <span className="tooltip-text">Edit Post</span>
        </div>

        <div className="tooltip-container" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCommentsClick}
            className="icon-button"
            aria-label="View Comments"
          >
            <MessageCircle size={20} />
          </button>
          <span className="tooltip-text">View Comments</span>
        </div>
        </div>
      </div>
    </div>
  );
}
