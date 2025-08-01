export const useWeather = () => {
  const getCurrent = async () => {
    const { data, error } = await useFetch("/api/weather/current", {
      query: { city: "Phuket" },
    });
    if (error.value)
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to load current weather",
      });
    return data.value;
  };
  const getForecast = async () => {
    const { data, error } = await useFetch("/api/weather/forecast", {
      query: { city: "Phuket" },
    });
    if (error.value)
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to load forecast",
      });
    return data.value;
  };
  return { getCurrent, getForecast };
};
