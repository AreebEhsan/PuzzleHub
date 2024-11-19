import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { supabase } from "../utils/supabaseClient";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest"); // Sorting: "newest" or "popular"
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Filter and Sort Logic
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === "newest") return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === "popular") return (b.upvotes || 0) - (a.upvotes || 0);
  });

  return (
    <div>
      <h1>Welcome to PuzzleHub</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
      />

      {/* Sorting Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setSortBy("newest")}
          style={{
            padding: "10px",
            marginRight: "10px",
            backgroundColor: sortBy === "newest" ? "#00bfa5" : "#ccc",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Newest
        </button>
        <button
          onClick={() => setSortBy("popular")}
          style={{
            padding: "10px",
            backgroundColor: sortBy === "popular" ? "#00bfa5" : "#ccc",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Most Popular
        </button>
      </div>

      {/* Post List */}
      {loading ? (
        <p>Loading posts...</p>
      ) : sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`} // Dynamically navigate to the PostPage using the post ID
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
              <h2>{post.title}</h2>
              <p>Upvotes: {post.upvotes || 0}</p>
              <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No posts match your search.</p>
      )}
    </div>
  );
};

export default Home;
