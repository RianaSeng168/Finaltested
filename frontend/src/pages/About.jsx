import React from "react";

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <p>OUR STORY</p>
          <h1>About Luxury Hotel</h1>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <small>SINCE 2010</small>
            <h2>A Sanctuary In The Heart Of Siem Reap</h2>
            <p>
              Nestled minutes from the ancient temples of Angkor, Luxury
              Hotel blends traditional Khmer craftsmanship with modern
              comfort. Every detail — from hand-carved wooden furnishings to
              serene garden courtyards — was designed to give guests a
              genuine sense of place.
            </p>
            <p>
              Our team takes pride in personalised hospitality: whether
              you're here for a family holiday, a romantic escape, or a
              quiet retreat, we tailor every stay around what matters most
              to you.
            </p>
            <ul className="about-highlights">
              <li><i className="bi bi-award"></i> Award-winning hospitality</li>
              <li><i className="bi bi-tree"></i> Tranquil tropical gardens</li>
              <li><i className="bi bi-cup-hot"></i> On-site dining &amp; wellness spa</li>
              <li><i className="bi bi-car-front"></i> Complimentary airport transfer</li>
            </ul>
          </div>

          <div className="about-image">
            <img src="/images/suite-bathroom.jpg" alt="Hotel interior" />
          </div>
        </div>
      </section>
    </>
  );
}
