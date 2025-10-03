import { getOrSetCache } from "../../utils/cache";
import { createHttp } from "../../utils/http";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const http = createHttp("https://api.open-meteo.com/v1");

  const cacheKey = `weather:${config.public.latitude}:${config.public.longitude}:current`;

  return await getOrSetCache(cacheKey, 1800, async () => {
    const res = await http.get("/forecast", {
      params: {
        latitude: config.public.latitude,
        longitude: config.public.longitude,
        timezone: config.public.timezone,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "is_day",
          "precipitation",
          "rain",
          "showers",
          "snowfall",
          "wind_gusts_10m",
          "wind_direction_10m",
          "wind_speed_10m",
          "weather_code",
          "cloud_cover",
          "pressure_msl",
          "surface_pressure",
        ],
        hourly: [
          "temperature_2m",
          "apparent_temperature",
          "precipitation",
          "wind_speed_10m",
          "uv_index",
          "is_day",
          "weathercode",
        ],
      },
    });

    return res.data;
  });
});
