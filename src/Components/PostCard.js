import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PostCard({post}) {

  const navigate = useNavigate();

  const handleClick = () => {
     navigate(`/posts/${post.id}`);
  }
  return (
    <div className='post-container'  onClick={() => handleClick(post.id)}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}
