import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Registration failed. That email or username may already be taken."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <p className="muted">Register to book faster and track your stays.</p>

        {error && (
          <div className="form-message error">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form className="stacked-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "CREATING ACCOUNT…" : "REGISTER"}
          </button>
        </form>

        <div className="auth-links">
          <span>
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
