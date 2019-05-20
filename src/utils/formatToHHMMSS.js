import { pad } from "./pad";

export function formatToHHMMSS(t) {
  let h = (m = s = 0);

  h = Math.floor(t / (60 * 60));
  t = t % (60 * 60);

  m = Math.floor(t / 60);
  t = t % 60;

  s = t;

  return pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2);
}
