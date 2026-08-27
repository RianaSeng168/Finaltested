import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-logo">LUXURY HOTEL</h2>
          <p>
            Experience exceptional hospitality, luxurious accommodation, and
            unforgettable moments in one destination.
          </p>
          <div className="social-icons">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-twitter-x"></i></a>
            <a href="#"><i className="bi bi-youtube"></i></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li><i className="bi bi-geo-alt"></i> Siem Reap, Cambodia</li>
            <li><i className="bi bi-telephone"></i> +855 12 345 678</li>
            <li><i className="bi bi-envelope"></i> info@luxuryhotel.com</li>
            <li><i className="bi bi-clock"></i> Open 24 Hours</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Subscribe to receive exclusive offers and hotel news.</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
            }}
          >
            <input type="email" placeholder="Your Email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Luxury Hotel. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
