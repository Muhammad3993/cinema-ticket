import type { Seat } from "../../../../types";
import "./seat-map.css";

interface SeatMapProps {
  rows: [string, Seat[]][];
  selected: Set<string>;
  onToggle: (seat: Seat) => void;
}

const SeatMap = ({ rows, selected, onToggle }: SeatMapProps) => {
  return (
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
                  onClick={() => onToggle(seat)}
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
  );
};

export default SeatMap;
