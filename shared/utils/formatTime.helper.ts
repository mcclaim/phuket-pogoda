import dayjs from "dayjs";
import "dayjs/locale/ru";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ru");

export function currentPhuketTime(time: Date | string) {
  return dayjs.tz(time, "Asia/Bangkok").format("HH:mm");
}

export function formatTime(time: string) {
  return dayjs(time).format("DD MMMM HH:mm");
}

export function formatOnlyTime(time: string) {
  return dayjs(time).format("HH:mm");
}

export function formatDate(time: string) {
  return dayjs(time).format("dddd, DD MMMM");
}

export function formatOnlyDate(time: string) {
  return dayjs(time).format("DD.MM.YYYY");
}

export function formatSecondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} ч ${minutes} мин`;
}
