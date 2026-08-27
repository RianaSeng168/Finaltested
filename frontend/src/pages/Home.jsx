import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="slider">
          <div className="slide active">
            <img src="/images/villa-pool.jpg" alt="Private villa pool" />
          </div>
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <p>WELCOME TO</p>
          <h1>Luxury Hotel</h1>
          <span>
            A sanctuary in the heart of Siem Reap, blending traditional Khmer
            craftsmanship with modern comfort.
          </span>
          <Link className="hero-btn" to="/rooms">
            EXPLORE ROOMS
          </Link>
        </div>
      </section>

      <section className="offers-section">
        <div className="section-title">
          <p>WHY STAY WITH US</p>
          <h2>An Experience Beyond A Room</h2>
          <span>
            From tranquil gardens to personalised service, every detail is
            designed around you.
          </span>
        </div>

        <div className="offer-grid">
          <div className="offer-card">
            <div className="offer-icon"><i className="bi bi-award"></i></div>
            <div className="offer-content">
              <small>Recognition</small>
              <h3>Award-Winning</h3>
              <p>Recognised hospitality trusted by travellers worldwide.</p>
              <Link to="/about">Discover</Link>
            </div>
          </div>
          <div className="offer-card">
            <div className="offer-icon"><i className="bi bi-tree"></i></div>
            <div className="offer-content">
              <small>Setting</small>
              <h3>Tropical Gardens</h3>
              <p>Serene courtyards minutes from the temples of Angkor.</p>
              <Link to="/about">Discover</Link>
            </div>
          </div>
          <div className="offer-card">
            <div className="offer-icon"><i className="bi bi-cup-hot"></i></div>
            <div className="offer-content">
              <small>Wellness</small>
              <h3>Dining &amp; Spa</h3>
              <p>On-site dining and a wellness spa for total relaxation.</p>
              <Link to="/rooms">Discover</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
