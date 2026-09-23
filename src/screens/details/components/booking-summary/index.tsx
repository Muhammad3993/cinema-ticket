import Price from "../../../../components/price";
import "./booking-summary.css";

interface BookingSummaryProps {
  count: number;
  total: number;
  onBuy: () => void;
}

const BookingSummary = ({ count, total, onBuy }: BookingSummaryProps) => {
  return (
    <div className="summary">
      <div className="summary__info">
        <span>{count} seat(s) selected</span>
        <strong>
          <Price value={total} />
        </strong>
      </div>
      <button
        type="button"
        className="summary__button"
        disabled={count === 0}
        onClick={onBuy}
      >
        Buy Tickets
      </button>
    </div>
  );
};

export default BookingSummary;
