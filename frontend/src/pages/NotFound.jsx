import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="page-hero-overlay"></div>
      <div className="page-hero-content">
        <p>404</p>
        <h1>Page Not Found</h1>
        <Link className="hero-btn" to="/" style={{ marginTop: "25px", display: "inline-block" }}>
          BACK HOME
        </Link>
      </div>
    </section>
  );
}
