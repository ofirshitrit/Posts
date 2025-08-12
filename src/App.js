import "./App.css";
import { fetchPosts } from "./api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import PostComments from "./Pages/PostComments";
import AddPostForm from "./Pages/AddPostForm";
import { useQuery } from "@tanstack/react-query";

function App() {


  const {
    data: posts, error, isLoading, isError 
  } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home posts={posts} error={error?.message} isLoading={isLoading} isError={isError} />
          }
        />
        <Route path="/post-comments/:id" element={<PostComments />} />
        <Route path="/add-post" element={<AddPostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
