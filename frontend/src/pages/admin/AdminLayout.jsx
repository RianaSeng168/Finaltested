import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <h3>Admin Dashboard</h3>
        <p className="muted">Signed in as {user?.username}</p>
        <nav>
          <NavLink to="/admin" end>
            <i className="bi bi-speedometer2"></i> Overview
          </NavLink>
          <NavLink to="/admin/rooms">
            <i className="bi bi-door-open"></i> Rooms &amp; Services
          </NavLink>
        </nav>
      </aside>

      <div className="admin-content">
        <Outlet />
      </div>
    </section>
  );
}
