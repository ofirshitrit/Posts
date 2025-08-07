import React, { useState, useEffect } from "react";
import PostComment from "../Components/PostComment";
import axios from 'axios';
import { useParams } from 'react-router-dom';


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
        console.error('שגיאה בטעינת פרטי הפוסט:', err);
      });
  }, [id]);

  //Get the comments of thr post
  useEffect(() => {
    if (!post) return; 
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error('שגיאה בקבלת התגובות של פוסט :', post.id, err));
  }, [post]);

  
  if (!post) return <div>Post is loading...</div>;


  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <ol>
        {comments.map((comment) => (
          <li key={comment.id}>
            <PostComment comment={comment}/>
          </li>
        ))}
      </ol>
      
    </div>
  );
}
