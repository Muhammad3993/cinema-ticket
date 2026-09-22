import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiGlobe, FiMapPin } from "react-icons/fi";
import { sessions } from "../../data/sessions";
import Poster from "../../components/poster";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#sessions") return;
    document.getElementById("sessions")?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <h1>Book your seat, enjoy the show</h1>
          <p>Choose a session below and pick your favorite seats.</p>
        </div>
      </section>

      <section className="sessions" id="sessions">
        <h2 className="sessions__title">Now Showing</h2>

        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            720: { slidesPerView: 2 },
            1080: { slidesPerView: 3 },
          }}
          className="sessions__swiper"
        >
          {sessions.map((session) => (
            <SwiperSlide key={session.id}>
              <article
                className="session-card"
                style={{ borderTopColor: session.color }}
                onClick={() => navigate(`/details/${session.id}`)}
              >
                <Poster
                  src={session.poster}
                  alt={session.title}
                  color={session.color}
                  className="session-card__poster"
                />

                <h3 className="session-card__title">{session.title}</h3>

                <ul className="session-card__meta">
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

                <button
                  type="button"
                  className="session-card__button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/details/${session.id}`);
                  }}
                >
                  Select Seats
                </button>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Home;