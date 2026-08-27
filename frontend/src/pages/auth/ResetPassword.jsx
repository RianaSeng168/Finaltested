import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../lib/api.js";

// Strapi's "reset password" email links to:
//   https://your-frontend.com/reset-password?code=xxxxx
// so we read the code straight from the query string.
export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") || "";
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!code) {
      setError("Missing or invalid reset code. Use the link from your email.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword({
        code,
        password: form.password,
        passwordConfirmation: form.confirmPassword,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error?.message || "Could not reset password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p className="muted">Choose a new password for your account.</p>

        {!code && (
          <div className="form-message error">
            <i className="bi bi-exclamation-circle"></i>
            <span>
              No reset code found in the URL. Open this page from the link in
              your password-reset email.
            </span>
          </div>
        )}

        {error && (
          <div className="form-message error">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form className="stacked-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "SAVING…" : "RESET PASSWORD"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </section>
  );
}
