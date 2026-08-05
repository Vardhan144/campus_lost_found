import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const API_ROOT = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .get(`/items/${id}`)
      .then((res) => setItem(res.data.item))
      .catch(() => setError("Item not found"));
  }, [id]);

  const handleClaim = async () => {
    setBusy(true);
    try {
      const res = await api.patch(`/items/${id}/claim`);
      setItem(res.data.item);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to claim item");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this report?")) return;
    setBusy(true);
    try {
      await api.delete(`/items/${id}`);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete item");
    } finally {
      setBusy(false);
    }
  };

  if (error) return <div className="container"><p className="error">{error}</p></div>;
  if (!item) return <div className="container"><p>Loading...</p></div>;

  const isOwner = user && item.reportedBy && user._id === item.reportedBy._id;

  return (
    <div className="container detail-container">
      <div className="detail-image">
        {item.imageUrl ? (
          <img src={`${API_ROOT}${item.imageUrl}`} alt={item.title} />
        ) : (
          <div className="item-card-placeholder large">No Image</div>
        )}
      </div>
      <div className="detail-info">
        <h1>{item.title}</h1>
        <span className={`status-badge status-${item.status}`}>{item.status}</span>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {item.description}</p>
        {item.contactInfo && <p><strong>Contact:</strong> {item.contactInfo}</p>}
        <p><strong>Reported by:</strong> {item.reportedBy?.name || "Unknown"}</p>

        <div className="detail-actions">
          {user && item.status !== "claimed" && item.status !== "resolved" && (
            <button onClick={handleClaim} disabled={busy}>Mark as Claimed</button>
          )}
          {isOwner && (
            <button onClick={handleDelete} disabled={busy} className="btn-danger">Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}
