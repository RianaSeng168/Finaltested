import React, { useEffect, useState } from "react";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../../lib/api.js";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  description: "",
  amenities: "",
  image: "",
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null); // null = "create mode"
  const [saving, setSaving] = useState(false);

  function loadRooms() {
    setLoading(true);
    getRooms()
      .then(setRooms)
      .catch(() => setError("Could not load rooms. Is Strapi running?"))
      .finally(() => setLoading(false));
  }

  useEffect(loadRooms, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEdit(room) {
    setEditingId(room.id);
    setForm({
      name: room.name || "",
      category: room.category || "",
      price: room.price ?? "",
      description: room.description || "",
      amenities: room.amenities || "",
      image: room.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = { ...form, price: Number(form.price) || 0 };

    try {
      if (editingId) {
        const updated = await updateRoom(editingId, payload);
        setRooms((rs) => rs.map((r) => (r.id === editingId ? updated : r)));
      } else {
        const created = await createRoom(payload);
        setRooms((rs) => [created, ...rs]);
      }
      cancelEdit();
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Save failed. Make sure your Admin role has create/update permission on Room."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this room? This cannot be undone.")) return;
    try {
      await deleteRoom(id);
      setRooms((rs) => rs.filter((r) => r.id !== id));
      if (editingId === id) cancelEdit();
    } catch {
      setError("Delete failed. Make sure your Admin role has delete permission on Room.");
    }
  }

  return (
    <>
      <h1>Rooms &amp; Services</h1>
      <p className="muted">Create, edit, and delete the rooms shown on the public Rooms page.</p>

      {error && (
        <div className="form-message error">
          <i className="bi bi-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Room" : "Add New Room"}</h3>

        <div className="stacked-form">
          <div className="form-row">
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Deluxe Room, Villa"
                value={form.category}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Price / night (USD)</label>
              <input type="number" name="price" min="0" value={form.price} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="/images/deluxe-room.jpg"
                value={form.image}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              placeholder="King Bed, Free Wi-Fi, Balcony"
              value={form.amenities}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="submit-btn" disabled={saving}>
              {saving ? "SAVING…" : editingId ? "UPDATE ROOM" : "CREATE ROOM"}
            </button>
            {editingId && (
              <button type="button" className="link-btn" onClick={cancelEdit}>
                Cancel edit
              </button>
            )}
          </div>
        </div>
      </form>

      <h3 className="admin-table-title">Existing Rooms</h3>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : rooms.length === 0 ? (
        <p className="muted">No rooms yet — add one above.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.category}</td>
                <td>${room.price}</td>
                <td className="admin-row-actions">
                  <button className="link-btn" onClick={() => startEdit(room)}>
                    Edit
                  </button>
                  <button className="link-btn danger" onClick={() => handleDelete(room.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
