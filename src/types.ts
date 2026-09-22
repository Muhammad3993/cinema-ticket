export type SeatStatus = "empty" | "selected" | "purchased";
export type SeatType = "standard" | "vip";

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
}

export interface MovieSession {
  id: string;
  title: string;
  description: string;
  cinema: string;
  hall: string;
  date: string;
  time: string;
  duration: string;
  language: string;
  color: string;
  poster: string;
  seats: Seat[];
}
