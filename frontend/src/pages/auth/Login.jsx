import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Login failed. Check your email/username and password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="muted">Log in to manage your bookings and account.</p>

        {error && (
          <div className="form-message error">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form className="stacked-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email or Username</label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "LOGGING IN…" : "LOG IN"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot your password?</Link>
          <span>
            No account? <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
