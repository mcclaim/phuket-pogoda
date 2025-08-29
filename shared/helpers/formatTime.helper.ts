export function formatTime(time: string) {
  return new Date(time).toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
  });
}

export function formatOnlyTime(time: string) {
  return new Date(time).toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(time: string) {
  return new Date(time).toLocaleString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatSecondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} ч ${minutes} мин`;
}
