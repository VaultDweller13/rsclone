/** Returns integer between min and max, inclusive */
export function getFromRange(min: number, max: number) {
  const iMin = Math.ceil(min);
  const iMax = Math.floor(max);

  return Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
}

/** Returns value clamped into the (min, max) range */
export function clamp(value: number, min: number, max: number) {
  let result = value;

  if (result < min) result = min;
  if (result > max) result = max;

  return result;
}

/** Returns specified HTMLElement with optional classList and textContent */
export function createElement(tag: string, classList?: string, text?: string) {
  const el = document.createElement(tag);
  if (classList) el.classList.add(...classList.split(' '));
  if (text) el.textContent = text;

  return el;
}
