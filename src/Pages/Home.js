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

  const handleSearchClick = () => {};

  return (
    <div className="Home">
      <h1>Post List</h1>
      {/* Search input for search posts by title  */}
      <div className="search-input">
        <input
          type="text"
          placeholder="Search post by its title"
          value={searchTitle}
          onChange={handleOnChange}
        />
        <button onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>
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
