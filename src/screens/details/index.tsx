import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiMapPin,
} from "react-icons/fi";
import { getSessionById } from "../../data/sessions";
import type { Seat } from "../../types";
import Price from "../../components/price";
import Poster from "../../components/poster";
import "./details.css";

const PRICE: Record<Seat["type"], number> = {
  standard: 35000,
  vip: 60000,
};

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const session = id ? getSessionById(id) : undefined;
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    if (!session) return [];
    const grouped = new Map<string, Seat[]>();
    session.seats.forEach((seat) => {
      const list = grouped.get(seat.row) ?? [];
      list.push(seat);
      grouped.set(seat.row, list);
    });
    return Array.from(grouped.entries());
  }, [session]);

  if (!session) {
    return (
      <div className="details details--empty">
        <p>Session not found.</p>
        <Link to="/" className="details__back">
          <FiArrowLeft /> Back to sessions
        </Link>
      </div>
    );
  }

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "purchased") return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) {
        next.delete(seat.id);
      } else {
        next.add(seat.id);
      }
      return next;
    });
  };

  const selectedSeats = session.seats.filter((seat) => selected.has(seat.id));
  const total = selectedSeats.reduce((sum, seat) => sum + PRICE[seat.type], 0);

  return (
    <div className="details">
      <Link to="/" className="details__back">
        <FiArrowLeft /> Back to sessions
      </Link>

      <div className="details__hero">
        <Poster
          src={session.poster}
          alt={session.title}
          color={session.color}
          className="details__hero-media"
        />
        <div className="details__hero-overlay" />

        <div className="details__hero-content">
          <h1>{session.title}</h1>
          <p className="details__description">{session.description}</p>

          <ul className="details__meta">
            <li>
              <FiMapPin /> {session.cinema} &middot; {session.hall}
            </li>
            <li>
              <FiCalendar /> {session.date}
            </li>
            <li>
              <FiClock /> {session.time} &middot; {session.duration}
            </li>
            <li>
              <FiGlobe /> {session.language}
            </li>
          </ul>
        </div>
      </div>

      <div className="hall">
        <div className="hall__screen">SCREEN</div>

        <div className="hall__rows">
          {rows.map(([row, seats]) => (
            <div className="hall__row" key={row}>
              <span className="hall__row-label">{row}</span>
              {seats.map((seat) => {
                const status =
                  seat.status === "purchased"
                    ? "purchased"
                    : selected.has(seat.id)
                    ? "selected"
                    : "empty";

                return (
                  <button
                    key={seat.id}
                    type="button"
                    className={`seat seat--${status} seat--${seat.type}`}
                    disabled={status === "purchased"}
                    onClick={() => toggleSeat(seat)}
                    title={`${seat.id} (${seat.type})`}
                  >
                    {seat.number}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="hall__legend">
          <span>
            <i className="seat seat--empty seat--standard" /> Standard
          </span>
          <span>
            <i className="seat seat--empty seat--vip" /> VIP
          </span>
          <span>
            <i className="seat seat--selected" /> Selected
          </span>
          <span>
            <i className="seat seat--purchased" /> Purchased
          </span>
        </div>
      </div>

      <div className="summary">
        <div className="summary__info">
          <span>{selectedSeats.length} seat(s) selected</span>
          <strong><Price value={total} /></strong>
        </div>
        <button
          type="button"
          className="summary__button"
          disabled={selectedSeats.length === 0}
        >
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default Details;
