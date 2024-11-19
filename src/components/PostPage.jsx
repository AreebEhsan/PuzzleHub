import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import { supabase } from "../utils/supabaseClient";

const PostPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Use for navigation after deletion
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // Toggle for edit mode
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchPostAndComments = async () => {
      // Fetch the post
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (postError) {
        console.error("Error fetching post:", postError);
      } else {
        setPost(postData);
        setUpdatedPost({
          title: postData.title,
          content: postData.content,
          image_url: postData.image_url,
        });
      }

      // Fetch comments for the post
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });

      if (commentsError) {
        console.error("Error fetching comments:", commentsError);
      } else {
        setComments(commentsData);
      }

      setLoading(false);
    };

    fetchPostAndComments();
  }, [id]);

  // Handle Upvotes
  const handleUpvote = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq("id", id);

    if (!error) {
      setPost({ ...post, upvotes: (post.upvotes || 0) + 1 });
    }
  };

  // Handle Adding Comments
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: id, content: newComment }])
      .select();

    if (error) {
      console.error("Error adding comment:", error);
    } else if (data && data.length > 0) {
      setComments([...comments, data[0]]); // Add the new comment
      setNewComment(""); // Clear the input field
    }
  };

  // Handle Edit Post
  const handleEditPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update(updatedPost)
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      setPost(data[0]); // Update the UI with the new data
      setEditMode(false); // Exit edit mode
    }
  };

  // Handle Delete Post
  const handleDeletePost = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
    } else {
      navigate("/"); // Redirect to homepage after deletion
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading post...</p>
      ) : post ? (
        <div>
          {editMode ? (
            <div>
              <h1>Edit Post</h1>
              <input
                type="text"
                value={updatedPost.title}
                onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
                placeholder="Post Title"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <textarea
                value={updatedPost.content}
                onChange={(e) => setUpdatedPost({ ...updatedPost, content: e.target.value })}
                placeholder="Post Content"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={updatedPost.image_url}
                onChange={(e) => setUpdatedPost({ ...updatedPost, image_url: e.target.value })}
                placeholder="Image URL"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <button
                onClick={handleEditPost}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "#00bfa5",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ccc",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {/* Post Details */}
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              {post.image_url && (
                <img src={post.image_url} alt={post.title} style={{ maxWidth: "100%" }} />
              )}
              <p>Upvotes: {post.upvotes || 0}</p>
              <button
                onClick={handleUpvote}
                style={{
                  padding: "10px 20px",
                  marginBottom: "10px",
                  backgroundColor: "#00bfa5",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Upvote
              </button>
              <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>

              {/* Edit and Delete Buttons */}
              <button
                onClick={() => setEditMode(true)}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "#00796b",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Edit Post
              </button>
              <button
                onClick={handleDeletePost}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#d32f2f",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete Post
              </button>
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h2>Comments</h2>
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={handleAddComment}
              style={{
                padding: "10px 20px",
                backgroundColor: "#00bfa5",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Add Comment
            </button>

            <div style={{ marginTop: "20px" }}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <p>{comment.content}</p>
                    <p style={{ fontSize: "0.8em", color: "#555" }}>
                      Posted on: {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostPage;
