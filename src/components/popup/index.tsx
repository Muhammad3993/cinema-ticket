import type { MouseEvent, ReactNode } from "react";
import "./popup.css";

interface PopupProps {
  onClose: () => void;
  children: ReactNode;
}

const Popup = ({ onClose, children }: PopupProps) => {
  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
