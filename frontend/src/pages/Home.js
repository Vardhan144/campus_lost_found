import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

const CATEGORIES = ["Electronics", "Documents", "Accessories", "Bags", "Clothing", "Keys", "Books", "Other"];

export default function Home() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/items", {
        params: { status, category, search, page, limit: 9 },
      });
      setItems(data.items);
      setPages(data.pages);
    } catch (err) {
      setError("Failed to load items. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [status, category, search, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="container">
      <h1>Browse Lost & Found Items</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title, description, location..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All Statuses</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="claimed">Claimed</option>
          <option value="resolved">Resolved</option>
        </select>
        <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading items...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p>No items found.</p>}

      <div className="item-grid">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      {pages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
