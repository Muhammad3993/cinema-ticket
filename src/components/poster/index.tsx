import { useState } from "react";
import { FiFilm } from "react-icons/fi";
import "./poster.css";

interface PosterProps {
  src?: string;
  alt: string;
  color: string;
  className?: string;
}

const Poster = ({ src, alt, color, className }: PosterProps) => {
  const [broken, setBroken] = useState(false);

  return (
    <div
      className={`poster ${className ?? ""}`}
      style={{ background: color }}
    >
      {src && !broken ? (
        <img
          src={src}
          alt={alt}
          className="poster__image"
          onError={() => setBroken(true)}
        />
      ) : (
        <FiFilm size={40} className="poster__fallback" />
      )}
    </div>
  );
};

export default Poster;
