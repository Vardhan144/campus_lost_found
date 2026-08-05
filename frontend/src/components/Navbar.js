import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        🎒 Campus Lost & Found
      </Link>
      <div className="nav-links">
        <Link to="/">Browse</Link>
        {user ? (
          <>
            <Link to="/report">Report Item</Link>
            <Link to="/dashboard">My Items</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn-link">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
