import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { getSessionById } from "../../data/sessions";
import type { Seat } from "../../types";
import { addPurchasedSeats } from "../../utils/storage";
import Popup from "../../components/popup";
import Hero from "./components/hero";
import SeatMap from "./components/seat-map";
import BookingSummary from "./components/booking-summary";
import "./details.css";

const PRICE: Record<Seat["type"], number> = {
  standard: 35000,
  vip: 60000,
};

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const session = id ? getSessionById(id) : undefined;
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);

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

  const handleBuy = () => {
    addPurchasedSeats(
      session.id,
      selectedSeats.map((seat) => seat.id)
    );
    setSelected(new Set());
    setShowPopup(true);
  };

  return (
    <div className="details">
      <Link to="/" className="details__back">
        <FiArrowLeft /> Back to sessions
      </Link>

      <Hero session={session} />

      <SeatMap rows={rows} selected={selected} onToggle={toggleSeat} />

      <BookingSummary
        count={selectedSeats.length}
        total={total}
        onBuy={handleBuy}
      />

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <FiCheckCircle className="popup__icon" />
          <p>Chiptalar olindi!</p>
          <button
            type="button"
            className="popup__button"
            onClick={() => setShowPopup(false)}
          >
            OK
          </button>
        </Popup>
      )}
    </div>
  );
};

export default Details;
