import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../../lib/api.js";

export default function AdminDashboard() {
  const [roomCount, setRoomCount] = useState(null);

  useEffect(() => {
    getRooms()
      .then((rooms) => setRoomCount(rooms.length))
      .catch(() => setRoomCount(null));
  }, []);

  return (
    <>
      <h1>Overview</h1>
      <p className="muted">
        Quick snapshot of your hotel's content. Manage rooms and services
        from the sidebar.
      </p>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <span className="stat-number">{roomCount ?? "—"}</span>
          <span className="stat-label">Rooms / Services published</span>
          <Link to="/admin/rooms">Manage rooms →</Link>
        </div>
      </div>
    </>
  );
}
