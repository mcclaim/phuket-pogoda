import { createHttp } from "../../utils/http";
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const http = createHttp("https://api.open-meteo.com/v1");
  const res = await http.get("/forecast", {
    params: {
      latitude: config.public.latitude,
      longitude: config.public.longitude,
      timezone: config.public.timezone,
      forecast_days: 16,

      // Текущая погода
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "uv_index_max",
        "precipitation_sum",
        "wind_speed_10m_max",
        "daylight_duration",
        "sunrise",
        "sunset",
      ],
    },
  });

  return res.data;
});
