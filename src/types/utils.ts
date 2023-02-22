/** Returns integer between min and max, inclusive */
export default function getFromRange(min: number, max: number) {
  const iMin = Math.ceil(min);
  const iMax = Math.floor(max);

  return Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
}
