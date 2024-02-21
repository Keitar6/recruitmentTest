export function capitalizeFirstLetter(s: string): string {
  if (s.length === 0) return s; // return original string if it's empty
  return s.charAt(0).toUpperCase() + s.slice(1);
}
