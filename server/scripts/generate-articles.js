import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const API_BASE = process.env.API_BASE_URL || "https://phuket-pogoda.ru";
const ARTICLE_PREFIX = process.env.ARTICLE_PREFIX || "pogoda-phukete-na-";

// Добавим в массив PLACES поле cta для Markdown
const PLACES = [
  {
    name: "Можно ли ехать в остров Пхи-Пхи?",
    slug: "phi-phi",
    cta: "[Забронируйте тур на Пхи-Пхи по выгодной цене](https://affiliate.klook.com/redirect?aid=104554&aff_adid=1163550&k_site=https%3A%2F%2Fwww.klook.com%2Fru%2Factivity%2F64800-phi-phi-khai-islands-one-day-tour%2F) — лучшие экскурсии и трансферы!",
  },
  {
    name: "Можно ли ехать в остров Джеймса Бонда?",
    slug: "james-bond",
    cta: "[Забронируйте тур на остров Джеймса Бонда](https://affiliate.klook.com/redirect?aid=104554&aff_adid=1163554&k_site=https%3A%2F%2Fwww.klook.com%2Fru%2Factivity%2F3227-james-bond-day-tour-big-boat-longtail-speedboat%2F) — места ограничены!",
  },
  {
    name: "Можно ли ехать в Симиланские острова?",
    slug: "similan",
    cta: "[Забронируйте тур на Симиланские острова](https://affiliate.klook.com/redirect?aid=104554&aff_adid=1163933&k_site=https%3A%2F%2Fwww.klook.com%2Fru%2Factivity%2F99532-similan-phuket-1-day-hop-on-off-boat-tour-speedboat-khao-lak%2F) — снорклинг, дайвинг и лучшие цены!",
  },
  {
    name: "Можно ли ехать в остров Самуи?",
    slug: "samui",
    cta: "[Забронируйте тур на Самуи](https://affiliate.klook.com/redirect?aid=104554&aff_adid=1163933&k_site=https%3A%2F%2Fwww.klook.com%2Fru%2Factivity%2F99532-similan-phuket-1-day-hop-on-off-boat-tour-speedboat-khao-lak%2F) — пляжи, экскурсии и трансферы по выгодным ценам!",
  },
  {
    name: "Можно ли ехать в остров Панган?",
    slug: "pangan",
    cta: "[Забронируйте тур на Панган](https://affiliate.klook.com/redirect?aid=104554&aff_adid=1163948&k_site=https%3A%2F%2Fwww.klook.com%2Fru%2Factivity%2F91504-phuket-must-see-atv-experience-phuket-join-half-day-tour%2F) — Full Moon Party и тихие бухты ждут вас!",
  },
  {
    name: "Можно ли ехать в остров Ланга?",
    slug: "langa",
    cta: "[Забронируйте тур на Ланга](https://www.klook.com/ru/city/106-langa/) — спокойный рай и лучшие цены на экскурсии!",
  },
  {
    name: "Можно ли погулять в Бангла роуд?",
    slug: "bangla-road",
    cta: "[Забронируйте экскурсию на Бангла Роуд](https://affiliate.klook.com/redirect?aid=104554&aff_adid=1163953&k_site=https%3A%2F%2Fwww.klook.com%2Fru%2Factivity%2F292-simon-cabaret-show-phuket%2F) — ночная жизнь и развлечения по выгодным ценам!",
  },
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

function findPublicDir(subdir) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const candidates = [
    // когда запускают из корня проекта
    path.join(process.cwd(), "public", subdir),
    // когда запускают из server/
    path.join(__dirname, "..", "public", subdir),
    // когда код собран в .output/server
    path.join(__dirname, "..", "..", "public", subdir),
    // запасной вариант для Nitro
    path.join(process.cwd(), ".output", "public", subdir),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isDirectory()) {
      return c;
    }
  }

  console.error(`[findPublicDir] Folder not found: ${subdir}`, candidates);
  return "";
}

(async function run() {
  try {
    console.log("Start generating articles...");
    const dir = findPublicDir("soveti");
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
title: "Погода на Пхукете на ${dateLabel}: полный разбор дня, личные рекомендации и идеальные экскурсии"
desc: "Точный прогноз на ${dateLabel}: температура ${tempMin}–${tempMax}°C, осадки ${rain} мм, ветер ${wind} км/ч. Экспертные советы, лучшие идеи для отдыха и экскурсий."
date: "${dateLabel}"
img: "${photo}"
slug: "${slug}"
---

>## 🌦️ Погода на Пхукете сегодня, ${dateLabel}

Сегодня остров встречает вас температурой **${tempMin}–${tempMax}°C**, уровнем осадков **${rain} мм** и ветром до **${wind} км/ч**.  
УФ-индекс: **${uv}** — важный показатель для планирования активности днём.

Этот прогноз собран так, чтобы вы смогли **выровнять свой день под погоду**, а не подстраивать погоду под планы. Это как иметь собственного локального гида, который подскажет: куда ехать, что посмотреть, какие места будут особенно красивыми именно сегодня.

---

## 👕 Что надеть и как подготовиться

${
  rain > 5
    ? "В воздухе есть вероятность коротких тропических дождей. Они обычно проходят быстро, но лёгкий дождевик или зонт будут очень кстати."
    : "Осадков почти не будет — идеальная погода для прогулок, кафе у моря и долгих пляжных часов."
}

${
  uv > 7
    ? "УФ-индекс высокий — защита обязательна: **SPF 50+**, головной убор и бутылка воды. В полдень солнце особенно активное."
    : "УФ-индекс комфортный — лёгкий SPF обеспечит безопасный отдых."
}

> Маленький лайфхак: туристы часто недооценивают ветер. При скоростях выше 20–25 км/ч море может казаться спокойным, но островные экскурсии — уже не такими предсказуемыми. Ниже — реальные рекомендации, составленные под конкретные условия сегодняшнего дня.

---

## 📍🗺️ Куда ехать сегодня: обзор экскурсий дня

Я учёл температуру, ветер, осадки и типичные решения причальных служб. Отмечены направления, которые станут лучшим выбором **именно сегодня**.

---

## 🥥 ${PLACES[0].name}
${
  rain > 10 || wind > 30
    ? "Сегодня море может быть динамичным, а волны — выше привычных. Чтобы поездка была комфортной, лучше перенести её — Пхи-Пхи великолепны в ясную и спокойную погоду."
    : "Отличный день для Пхи-Пхи! Море спокойное, видимость отличная — снорклинг сегодня будет особенно ярким. Идеально, если хотите увидеть острова в лучшем виде."
}\n
${PLACES[0].cta}

---

## 🌧️ ${PLACES[1].name}
${
  rain > 8
    ? "Погода переменная: возможны непродолжительные дожди. Они не мешают экскурсии, но дождевик пригодится."
    : "Сегодня редкий баланс: туманность минимальная, цвет воды насыщенный — поездка на остров Джеймса Бонда подарит очень «чистые» фотографии."
}\n
${PLACES[1].cta}

---

## 🌊 ${PLACES[2].name}
${
  wind > 25
    ? "Из-за усиленного ветра некоторые операторы могут временно ограничивать маршруты. Если планируете Симиланы — уточните доступность перед выездом."
    : "Один из лучших дней для Симилан: прозрачность воды высокая, волна ниже средней, а острова особенно фотогеничны утром."
}\n
${PLACES[2].cta}

---

## 🌴 ${PLACES[3].name}
${
  rain > 12 || wind > 35
    ? "Сегодня — не лучший день для поездки: длительная дорога в сочетании с волной может быть утомительной."
    : "Если давно хотели на Самуи — сегодня хороший момент. Погода мягкая, дорога обещает быть комфортной."
}\n
${PLACES[3].cta}

---

## 🐢 ${PLACES[4].name}
${
  rain > 10
    ? "Погода слегка капризная, и для расслабленного пляжного отдыха лучше подождать более солнечного дня."
    : "Отличный выбор: спокойная вода, чистые пляжи — Панган будет особенно уютным, если хотите тишины и красивых бухт."
}\n
${PLACES[4].cta}

---

## 🌅 ${PLACES[5].name}
${
  wind > 28
    ? "Сегодня ветер может усилиться к вечеру — морские прогулки стоит перепроверить заранее."
    : "Спокойный день для Ланга: здесь мягкий песок и отличные виды на закате — отличное направление для тех, кто любит не-туристические места."
}\n
${PLACES[5].cta}

---

## 🎉 ${PLACES[6].name}
${
  rain > 5
    ? "К вечеру возможно лёгкое похолодание из-за кратковременного дождя — возьмите лёгкую куртку, если планируете долгие прогулки."
    : "Сегодня Бангла Роуд будет особенно оживлённой — хорошая погода делает вечер ярким и насыщенным."
}\n
${PLACES[6].cta}

---

## 💡 Лучшие моменты дня

- **Восход** в ${sunrise} — идеальное время для пляжей, йоги, фото без туристов и прогулки по линии прибоя.  
- **Закат** в ${sunset} — отличная возможность посидеть в кафе у моря или отправиться на видовую точку.  
- При ветре выше **25 км/ч** некоторые морские туры могут корректировать маршрут — уточняйте детали у операторов утром.  
- Если путешествуете с детьми: высокая влажность ускоряет усталость, делайте перерывы и берите сменную лёгкую одежду.

---

<sub>_Этот прогноз создан автоматически, но основан на реальных погодных данных и ежедневных наблюдениях на Пхукете. Мы обновляем его каждый день, чтобы вы могли планировать отдых максимально точно._</sub>


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
