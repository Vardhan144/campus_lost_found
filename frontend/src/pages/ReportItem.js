import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CATEGORIES = ["Electronics", "Documents", "Accessories", "Bags", "Clothing", "Keys", "Books", "Other"];

export default function ReportItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other",
    status: "lost",
    location: "",
    date: new Date().toISOString().slice(0, 10),
    contactInfo: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("image", image);

      const res = await api.post("/items", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/items/${res.data.item._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container form-container">
      <h2>Report a Lost or Found Item</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="item-form">
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Black Wallet" />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe distinguishing features, contents, etc."
        />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label>Location</label>
        <input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Library, 2nd Floor" />

        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <label>Contact Info</label>
        <input name="contactInfo" value={form.contactInfo} onChange={handleChange} placeholder="Phone/email for the finder to reach you" />

        <label>Photo (optional)</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
