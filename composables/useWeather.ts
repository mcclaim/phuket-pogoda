export const useWeather = () => {
  const getCurrent = () =>
    useAsyncData("weather-current", () => $fetch("/api/weather/current"));

  const getForecast = () =>
    useAsyncData("weather-forecast", () => $fetch("/api/weather/forecast"));

  return { getCurrent, getForecast };
};
