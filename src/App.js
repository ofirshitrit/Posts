import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import PostDetails from "./Pages/PostDetails";
import AddPostForm from "./Pages/AddPostForm";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error("שגיאה בשליפת פוסטים:", err));
  }, []);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/add-post"
          element={<AddPostForm setPosts={setPosts} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
