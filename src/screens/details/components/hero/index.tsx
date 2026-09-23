import { FiCalendar, FiClock, FiGlobe, FiMapPin } from "react-icons/fi";
import type { MovieSession } from "../../../../types";
import Poster from "../../../../components/poster";
import "./hero.css";

interface HeroProps {
  session: MovieSession;
}

const Hero = ({ session }: HeroProps) => {
  return (
    <div className="details_hero">
      <Poster
        src={session.poster}
        alt={session.title}
        color={session.color}
        className="hero__media"
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <h1>{session.title}</h1>
        <p className="hero__description">{session.description}</p>

        <ul className="hero__meta">
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
  );
};

export default Hero;
