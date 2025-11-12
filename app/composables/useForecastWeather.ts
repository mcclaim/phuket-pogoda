export function useForecastWeather() {
  return useAsyncData("weather-forecast", () =>
    $fetch("/api/weather/forecast")
  );
}
