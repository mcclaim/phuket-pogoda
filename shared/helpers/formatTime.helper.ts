export function formatTime(time: string) {
  return new Date(time).toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
  });
}
