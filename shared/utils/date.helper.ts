export function parseDate(d: string): number {
  const parts = d.split(".");
  const day = Number(parts[0]) || 1;
  const month = Number(parts[1]) || 1;
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day).getTime();
}
