export function useCurrentWeather() {
  return useAsyncData("weather-current", () => $fetch("/api/weather/current"));
}
