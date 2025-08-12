import { useState } from "react";
import { Search } from "lucide-react";
import PostList from '../Components/PostList';
import Loader from '../Components/Loader';


function Home({ posts, error, isLoading, isError }) {
  const [searchTitle, setSearchTitle] = useState("");
  const isSearching = searchTitle.trim() !== "";

  if (isLoading) {
    return (
      <Loader
        text={"Post List is loading"}
        subtext={"Please wait while we fetch the content"}
      />
    );
  }

  if (isError) {
    return <div className="error-msg">Error: {error.message}</div>;
  }

  if (posts.length === 0) {
    return <p className="no-posts-msg">No posts found.</p>;
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className="Home">
      <h1>Post List</h1>

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar-container">
          <div className="search-icon">
            <Search className="search-icon-svg" />
          </div>
          <input
            type="text"
            placeholder="Search posts by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Posts for display */}
      {isSearching ? (
        filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts} />
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <Search size={48} className="no-results-svg" />
            </div>
            <h3>No posts found</h3>
            <p>Try adjusting your search terms or browse all posts.</p>
          </div>
        )
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default Home;
