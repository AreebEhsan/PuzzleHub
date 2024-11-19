
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./components/PostPage";
import NotFound from "./pages/NotFound";
import CreatePost from "./components/CreatePost"; // Correct path for CreatePost
import NavBar from "./components/NavBar"; // New NavBar component


const App = () => (
  <Router>
    <NavBar /> {/* Add the navigation bar here */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
