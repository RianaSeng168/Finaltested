import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header id="header">
      <div className="topbar">
        <div className="left-menu">
          <div className="hamburger" onClick={() => setNavOpen((v) => !v)}>
            <i className="bi bi-list"></i>
          </div>
        </div>

        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Luxury Hotel Logo" />
            <h2>LUXURY HOTEL</h2>
          </Link>
        </div>

        <div className="right-menu">
          <select defaultValue="EN">
            <option>EN</option>
            <option>KH</option>
          </select>
          <select defaultValue="USD">
            <option>USD</option>
            <option>KHR</option>
          </select>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link to="/admin" title="Admin dashboard">
                  <i className="bi bi-speedometer2"></i>
                </Link>
              )}
              <span className="nav-username">Hi, {user.username}</span>
              <button className="link-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <i className="bi bi-person"></i>
            </Link>
          )}

          <Link className="rate-btn" to="/rooms">
            CHECK RATES
          </Link>
        </div>
      </div>

      <nav className={`navbar ${navOpen ? "nav-open" : ""}`}>
        <ul onClick={() => setNavOpen(false)}>
          <li>
            <NavLink to="/about">ABOUT</NavLink>
          </li>
          <li>
            <NavLink to="/rooms">ROOMS &amp; SUITES</NavLink>
          </li>
          <li>
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
          {!isAuthenticated && (
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
