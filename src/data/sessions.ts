import type { MovieSession, Seat, SeatType } from "../types";
import { getPurchasedSeatIds } from "../utils/storage";

const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 6;
const VIP_ROWS = ["A", "B"];

const createSeats = (purchased: string[]): Seat[] => {
  const seats: Seat[] = [];

  ROWS.forEach((row) => {
    for (let number = 1; number <= SEATS_PER_ROW; number++) {
      const id = `${row}${number}`;
      const type: SeatType = VIP_ROWS.includes(row) ? "vip" : "standard";

      seats.push({
        id,
        row,
        number,
        type,
        status: purchased.includes(id) ? "purchased" : "empty",
      });
    }
  });

  return seats;
};

export const sessions: MovieSession[] = [
  {
    id: "interstellar",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cinema: "Magic Cinema",
    hall: "Hall 3",
    date: "26 August 2026",
    time: "19:30",
    duration: "2h 49m",
    language: "English",
    color: "#1f3a63",
    poster: "/assets/interstellar-2014.webp",
    seats: createSeats(["C3", "C4", "D2", "D3", "A1", "B6"]),
  },
  {
    id: "inception",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    cinema: "Magic Cinema",
    hall: "Hall 1",
    date: "27 August 2026",
    time: "17:00",
    duration: "2h 28m",
    language: "English",
    color: "#5b2a86",
    poster: "/assets/inception.avif",
    seats: createSeats(["A2", "A3", "B4", "D5", "D6"]),
  },
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
    cinema: "Star Cinema",
    hall: "Hall 2",
    date: "28 August 2026",
    time: "21:15",
    duration: "2h 32m",
    language: "English",
    color: "#1e1e1e",
    poster: "/assets/the-dark-knight.jpg",
    seats: createSeats(["C1", "C2", "C5", "C6", "E3", "E4"]),
  },
];

export const getSessionById = (id: string): MovieSession | undefined => {
  const session = sessions.find((s) => s.id === id);
  if (!session) return undefined;

  const purchased = new Set(getPurchasedSeatIds(id));
  if (purchased.size === 0) return session;

  return {
    ...session,
    seats: session.seats.map((seat) =>
      purchased.has(seat.id) ? { ...seat, status: "purchased" } : seat
    ),
  };
};
