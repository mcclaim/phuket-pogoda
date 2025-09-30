import axios from "axios";
import fs from "fs";
import path from "path";

const API_BASE = process.env.API_BASE_URL || "http://localhost:3000";
const ARTICLE_PREFIX = process.env.ARTICLE_PREFIX || "pogoda-phukete-na-";

const PLACES = [
  { name: "Можно ли ехать в остров Пхи-Пхи?", slug: "phi-phi" },
  { name: "Можно ли ехать в остров Джеймса Бонда?", slug: "james-bond" },
  { name: "Можно ли ехать в Симиланские острова?", slug: "similan" },
  { name: "Можно ли ехать в остров Самуи?", slug: "samui" },
  { name: "Можно ли ехать в остров Панган?", slug: "pangan" },
  { name: "Можно ли ехать в остров Ланга?", slug: "langa" },
  { name: "Можно ли погулять в Бангла роуд?", slug: "bangla-road" },
];

async function fetchForecast() {
  const url = `${API_BASE}/api/weather/forecast`;
  const res = await axios.get(url);
  return res.data;
}

async function fetchPhotos() {
  const url = `${API_BASE}/api/photos`;
  const res = await axios.get(url);
  return res.data;
}

function formatOnlyDate(time) {
  return new Date(time).toLocaleString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function formatTime(time) {
  return new Date(time).toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
  });
}

(async function run() {
  try {
    console.log("Start generating articles...");
    const dir = path.join(process.cwd(), "content", "soveti");
    fs.mkdirSync(dir, { recursive: true });

    const forecast = await fetchForecast();
    if (!forecast || !forecast.daily || !Array.isArray(forecast.daily.time)) {
      console.error("Invalid forecast data:", forecast);
      process.exit(1);
    }

    // Удаляем старые авто-статьи (все, что начинается с prefix)
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.startsWith(ARTICLE_PREFIX)) {
        fs.unlinkSync(path.join(dir, f));
        console.log("Deleted old article:", f);
      }
    }

    // Генерируем 15 статей (0..14)
    const photos = await fetchPhotos();
    const days = Math.min(15, forecast.daily.time.length);
    for (let i = 0; i < days; i++) {
      const day = forecast.daily.time[i];
      const dateLabel = formatOnlyDate(day);
      const tempMax = forecast.daily.temperature_2m_max?.[i] ?? "—";
      const tempMin = forecast.daily.temperature_2m_min?.[i] ?? "—";
      const rain = forecast.daily.precipitation_sum?.[i] ?? 0;
      const wind = forecast.daily.wind_speed_10m_max?.[i] ?? 0;
      const uv = forecast.daily.uv_index_max?.[i] ?? 0;
      const sunrise = formatTime(forecast.daily.sunrise[i]);
      const sunset = formatTime(forecast.daily.sunset[i]);
      const photo =
        `${
          photos?.[i % photos.length]?.urls.raw
        }&w=700&h=300&q=80&fit=crop&auto=format` || "";

      const slug = `${ARTICLE_PREFIX}${dateLabel}`; // например: auto-2025-08-11
      const filePath = path.join(dir, `${slug}.md`);

      // SEO-friendly frontmatter и содержимое
      const content = `---
title: "Погода на Пхукете на ${dateLabel}: советы туристам и рекомендации по экскурсиям"
desc: "Прогноз на ${dateLabel}: температура ${tempMin}–${tempMax}°C, осадки ${rain} мм, ветер ${wind} км/ч. Советы туристам и рекомендации по экскурсиям."
date: "${dateLabel}"
img: "${photo}"
slug: "${slug}"
---

>## Прогноз погоды на ${dateLabel}

На Пхукете ожидается температура от **${tempMin}°C** до **${tempMax}°C**.  
Уровень осадков — **${rain} мм**, ветер максимум **${wind} км/ч**, УФ-индекс: **${uv}**.

## Что надеть туристам?
${
  rain > 5
    ? "Советуем взять зонт или лёгкую непромокаемую куртку."
    : "Лёгкая летняя одежда и солнцезащитный крем — лучший выбор."
}
${
  uv > 7
    ? "Высокий УФ-индекс — используйте крем SPF 50+ и головной убор."
    : "УФ-индекс умеренный — лёгкая защита достаточна."
}

##

## Можно ли ехать на экскурсии в Пхукете:

### ${PLACES[0].name}
${
  rain > 10 || wind > 30
    ? "Поездку лучше перенести — возможен шторм или сильный ветер."
    : "Погода благоприятная для поездки на остров."
}

### ${PLACES[1].name}
${
  rain > 8
    ? "Есть риск дождя — берите дождевик."
    : "Отличная погода для фото и прогулки к месту Джеймса Бонда."
}

### ${PLACES[2].name}
${
  wind > 25
    ? "Высокий ветер — будьте осторожны, возможна отмена туров."
    : "Можно ехать — море ожидается спокойным."
}

### ${PLACES[3].name}
${
  rain > 12 || wind > 35
    ? "Лучше перенести поездку — штормовое предупреждение."
    : "Погода позволяет — поездка на Самуи будет комфортной."
}

### ${PLACES[4].name}
${
  rain > 10
    ? "Осадки могут испортить отдых — лучше выбрать другой день."
    : "Можно ехать — условия благоприятные для отдыха на Пангане."
}

### ${PLACES[5].name}
${
  wind > 28
    ? "Ветер может осложнить морскую прогулку — рекомендуется перенести."
    : "Отличный день для поездки на остров Ланга."
}

### ${PLACES[6].name}
${
  rain > 5
    ? "Вечером возможны кратковременные осадки — возьмите лёгкую куртку."
    : "Отличная погода для прогулки по Бангла Роуд."
}

##
---

#### Лайфхаки и советы
- Проверьте время восхода и заката перед фотосессией. Время восхода: ${sunrise}. Время заката: ${sunset}.  
- Для морских экскурсий смотрите информацию о ветре и волнении — при ветре свыше 25 км/ч тур может быть отменён.  
- Для семей с детьми: высокая влажность и жара — предусмотрите питьё и солнцезащиту.

<sub>_Статьи автоматически генерируются каждый день и покрывают прогноз на 7 дней. Планируйте отдых заранее и проверяйте обновления._</sub>

`;

      fs.writeFileSync(filePath, content, "utf8");
      console.log("Created article:", filePath);
    }

    console.log("Done: generated", days, "articles.");
  } catch (err) {
    console.error("Error while generating articles:", err.message || err);
    process.exit(1);
  }
})();
