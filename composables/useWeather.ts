export const useWeather = () => {
  const location = {
    latitude: 7.8906,
    longitude: 98.3981,
    timezone: "auto",
  };

  const getCurrent = async () => {
    const { data, error, pending } = await useFetch("/api/weather/current", {
      query: { latitude: 7.8906, longitude: 98.3981, timezone: "auto" },
    });
    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to load current weather",
      });
    }

    return {
      current: data.value?.current,
      currentUnits: data.value?.current_units,
      hourly: data.value?.hourly,
      pending,
    };
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
