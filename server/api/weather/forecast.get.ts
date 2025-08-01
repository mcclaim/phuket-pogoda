import dayjs from "dayjs";
import { createHttp } from "../../utils/http";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const city = (query.city as string) || "Phuket";
  const config = useRuntimeConfig();
  const key = config.owmKey;
  if (!key)
    return { error: "OWM API key missing. Set OWM_KEY in environment." };
  const http = createHttp("https://api.openweathermap.org/data/3.0");
  const res = await http.get("/forecast", {
    params: { q: city, units: "metric", lang: "ru", appid: key },
  });
  const list: any[] = res.data.list || [];
  const groups: Record<string, any[]> = {};
  for (const item of list) {
    const d = dayjs(item.dt * 1000).format("YYYY-MM-DD");
    groups[d] = groups[d] || [];
    groups[d].push(item);
  }
  const summary = Object.entries(groups)
    .slice(0, 5)
    .map(([date, arr]: any) => {
      const temps = arr.map((i: any) => i.main.temp);
      const w = arr[Math.floor(arr.length / 2)]?.weather?.[0] || {};
      return {
        date,
        temp_min: Math.min(...temps),
        temp_max: Math.max(...temps),
        description: w.description || "",
        icon: w.icon || "01d",
      };
    });
  return { city: res.data.city, days: summary };
});
