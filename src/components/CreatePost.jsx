import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { supabase } from "../utils/supabaseClient"; // Ensure supabaseClient.js is configured

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Insert post into Supabase
    const { error } = await supabase
      .from("posts") // Replace "posts" with your actual table name
      .insert([
        {
          title,
          content,
          image_url: imageUrl,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error("Error creating post:", error.message);
    } else {
      console.log("Post created successfully!");
      navigate("/"); // Redirect to homepage
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create a New Post</h2>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px" }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#00bfa5",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Submitting..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePost;
