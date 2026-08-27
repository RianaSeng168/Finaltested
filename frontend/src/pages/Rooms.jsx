import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../lib/api.js";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch(() =>
        setError(
          "Couldn't load rooms from the backend. Make sure Strapi is running and the Room content-type's find/findOne permissions are public."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <p>ACCOMMODATION</p>
          <h1>Rooms &amp; Suites</h1>
        </div>
      </section>

      <section className="rooms-page-section">
        <div className="section-title">
          <p>CHOOSE YOUR STAY</p>
          <h2>Every Room, Thoughtfully Designed</h2>
        </div>

        {loading && <p className="muted" style={{ textAlign: "center" }}>Loading rooms…</p>}
        {error && <div className="form-message error"><i className="bi bi-exclamation-circle"></i><span>{error}</span></div>}

        {!loading && !error && rooms.length === 0 && (
          <p className="muted" style={{ textAlign: "center" }}>
            No rooms published yet — add some from the Admin Dashboard.
          </p>
        )}

        <div className="rooms-catalog">
          {rooms.map((room) => (
            <div className="room-catalog-card" key={room.id}>
              <div className="room-catalog-image">
                <img src={room.image || "/images/deluxe-room.jpg"} alt={room.name} />
                <span className="price-tag">${room.price} / night</span>
              </div>

              <div className="room-catalog-info">
                <small>{room.category || "ROOM"}</small>
                <h3>{room.name}</h3>
                <p>{room.description}</p>

                <ul>
                  {(room.amenities || "")
                    .split(",")
                    .map((a) => a.trim())
                    .filter(Boolean)
                    .map((a) => (
                      <li key={a}>✔ {a}</li>
                    ))}
                </ul>

                <Link
                  to={`/contact?room=${encodeURIComponent(room.name)}`}
                  className="room-btn"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
