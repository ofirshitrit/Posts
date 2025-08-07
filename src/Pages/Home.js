import React, { useEffect, useState } from 'react';
import PostList from '../Components/PostList';
import axios from 'axios';


function Home() {
 
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log("posts: ", res.data);
        setPosts(res.data);
      })
      .catch(err => console.error('שגיאה בשליפת פוסטים:', err));
  }, []);



  return (
    <div className="Home">
        <h1>Post List</h1>
        <PostList posts = {posts}/>
    </div>
  );
}

export default Home;
