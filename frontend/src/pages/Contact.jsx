import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus({ type: "error", text: "Please fill in your name, a valid email, and a message." });
      return;
    }

    // In a fuller build this would POST to a Strapi "message" content-type.
    setStatus({
      type: "success",
      text: `Thanks for reaching out, ${form.name} — we've received your message and will reply as soon as possible.`,
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <p>GET IN TOUCH</p>
          <h1>Contact Us</h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h2>We'd Love To Hear From You</h2>
          <p>
            Whether you have a question about our rooms, a special request
            for your stay, or just want to say hello — our team is here to
            help.
          </p>
          <ul className="contact-details">
            <li><i className="bi bi-geo-alt"></i> Siem Reap, Cambodia</li>
            <li><i className="bi bi-telephone"></i> +855 12 345 678</li>
            <li><i className="bi bi-envelope"></i> info@luxuryhotel.com</li>
            <li><i className="bi bi-clock"></i> Open 24 Hours</li>
          </ul>
        </div>

        <div className="contact-form-wrap">
          {status && (
            <div className={`form-message ${status.type}`}>
              <i className={`bi ${status.type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`}></i>
              <span>{status.text}</span>
            </div>
          )}

          <form className="stacked-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </section>
    </>
  );
}
