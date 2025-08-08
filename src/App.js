import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import PostComments from "./Pages/PostComments";
import AddPostForm from "./Pages/AddPostForm";

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setError(null);
      })
      .catch(() => setError("Failed to load posts. Please try again later."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} error={error} isLoading={isLoading} />}
        />
        <Route path="/post-comments/:id" element={<PostComments />} />
        <Route path="/add-post" element={<AddPostForm setPosts={setPosts} />} />
      </Routes>
    </Router>
  );
}

export default App;
