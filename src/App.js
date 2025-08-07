import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import PostDetails from './Pages/PostDetails';
import AddPostForm from './Pages/AddPostForm'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/addPost" element={<AddPostForm.js /> } />

      </Routes>
    </Router>
  );
}

export default App;
