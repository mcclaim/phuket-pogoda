import { createHttp } from "../../utils/http";
export default defineEventHandler(async () => {
  const http = createHttp("https://api.open-meteo.com/v1");
  const res = await http.get("/forecast", {
    params: {
      latitude: 7.8906,
      longitude: 98.3981,
      timezone: "auto",

      // Текущая погода
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

      // Почасовая погода на 48 часов
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
