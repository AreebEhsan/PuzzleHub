import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#00bfa5",
        color: "white",
      }}
    >
      <h1 style={{ margin: 0 }}>PuzzleHub</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
          Create New Post
        </Link>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
