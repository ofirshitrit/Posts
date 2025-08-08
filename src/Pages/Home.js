import { useState } from "react";
import PostList from "../Components/PostList";
import { FaSearch } from "react-icons/fa";

function Home({ posts }) {
  const [searchTitle, setSearchTitle] = useState("");
  const isSearching = searchTitle.trim() !== "";
  
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase())
  );
  const handleOnChange = (event) => {
    setSearchTitle(event.target.value);
  };


  return (
    <div className="Home">
      <h1>Post List</h1>

      {/* Search input for search posts by title  */}
      <div className="search-section">
        <input
        className="search-input"
          type="text"
          placeholder="Search posts by title"
          value={searchTitle}
          onChange={handleOnChange}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>

      <div>
        
        <h3>Number of posts: {isSearching ? filteredPosts.length : posts.length}  </h3>
      </div>

      {/* Posts for display */}
      {isSearching ? (
        filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts} />
        ) : (
          <p>No posts found for this search.</p>
        )
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default Home;
