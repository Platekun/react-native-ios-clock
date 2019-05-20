export function pad(num, size) {
  let s = "0000" + num;
  return s.substr(s.length - size);
}
