const PURCHASED_SEATS_KEY = "cinema:purchasedSeats";

const getPurchasedSeatsMap = (): Record<string, string[]> => {
  try {
    const raw = localStorage.getItem(PURCHASED_SEATS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
  } catch {
    return {};
  }
};

export const getPurchasedSeatIds = (sessionId: string): string[] =>
  getPurchasedSeatsMap()[sessionId] ?? [];

export const addPurchasedSeats = (
  sessionId: string,
  seatIds: string[]
): void => {
  const map = getPurchasedSeatsMap();
  const merged = new Set([...(map[sessionId] ?? []), ...seatIds]);
  map[sessionId] = Array.from(merged);

  try {
    localStorage.setItem(PURCHASED_SEATS_KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable (private mode, quota) — booking still works in-session
  }
};
