import cuid from "cuid";

export function createLapEntry(t, idx) {
  return {
    id: cuid(),
    lapNumber: idx,
    time: t
  };
}
