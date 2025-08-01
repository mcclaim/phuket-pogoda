import { createHttp } from "../../utils/http";
export default defineEventHandler(async (event) => {
  const http = createHttp("https://api.openweathermap.org/data/3.0");
  const res = await http.get("/onecall", {
    params: {
      lat: "7.878978",
      lon: "98.398392",
      units: "metric",
      lang: "ru",
      appid: process.env.OWM_KEY,
    },
  });
  return res.data;
});
