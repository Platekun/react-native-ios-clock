import { pad } from "./pad";

export function formatToStopwatchTime(t) {
  let h = (m = s = ms = 0);

  h = Math.floor(t / (60 * 60 * 100));
  t = t % (60 * 60 * 100);

  m = Math.floor(t / (60 * 100));
  t = t % (60 * 100);

  s = Math.floor(t / 100);
  ms = t % 100;

  return pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2) + "." + pad(ms, 2);
}
