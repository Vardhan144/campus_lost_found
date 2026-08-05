import React from "react";
import { Link } from "react-router-dom";

const API_ROOT = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

const statusColors = {
  lost: "#e74c3c",
  found: "#27ae60",
  claimed: "#f39c12",
  resolved: "#7f8c8d",
};

export default function ItemCard({ item }) {
  return (
    <Link to={`/items/${item._id}`} className="item-card">
      <div className="item-card-image">
        {item.imageUrl ? (
          <img src={`${API_ROOT}${item.imageUrl}`} alt={item.title} />
        ) : (
          <div className="item-card-placeholder">No Image</div>
        )}
        <span
          className="status-badge"
          style={{ backgroundColor: statusColors[item.status] || "#999" }}
        >
          {item.status}
        </span>
      </div>
      <div className="item-card-body">
        <h3>{item.title}</h3>
        <p className="item-meta">{item.category} • {item.location}</p>
        <p className="item-date">{new Date(item.date).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
