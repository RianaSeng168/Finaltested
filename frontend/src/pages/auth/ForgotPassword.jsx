import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../lib/api.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      await forgotPassword(email);
      setStatus({
        type: "success",
        text: "If an account exists for that email, a reset link has been sent. Check your inbox.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="muted">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {status && (
          <div className={`form-message ${status.type}`}>
            <i className={`bi ${status.type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`}></i>
            <span>{status.text}</span>
          </div>
        )}

        <form className="stacked-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "SENDING…" : "SEND RESET LINK"}
          </button>
        </form>

        <div className="auth-links">
          <span>
            Remembered it? <Link to="/login">Back to login</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
