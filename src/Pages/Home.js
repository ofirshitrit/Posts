import { useState } from 'react';
import PostList from '../Components/PostList';


function Home({posts, onSearchPost}) {
 
  const [title, setTitle] = useState("");

  const handleOnChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <div className="Home">
        <h1>Post List</h1>
        <div>
          <input type="text" placeholder='Search post by its title' value={title} onChange={handleOnChange} />
          
        </div>
        <PostList posts = {posts}/>
    </div>
  );
}

export default Home;
