export const NAVIGATION_CONSTANTS = {
  HOME: {
    title: "Погода на сегодня",
    route: "/",
  },
  FORECAST: {
    title: "Прогноз",
    route: "/pogoda",
    children: [
      {
        title: "Завтра",
        route: "/pogoda/na-zavtra",
      },
      {
        title: "На неделю",
        route: "/pogoda/na-nedelyu",
      },
      {
        title: "На выходные",
        route: "/pogoda/na-vyhodnye",
      },
      {
        title: "На 10 дней",
        route: "/pogoda/10-dney",
      },
      {
        title: "На 15 дней",
        route: "/pogoda/15-dney",
      },
      {
        title: "На месяц",
        route: "/pogoda/na-mesyats",
      },
    ],
  },
  ARTICLES: {
    title: "Статьи",
    route: "/articles",
    children: {
      RECOMMENDATION: {
        title: "Советы для Пхукета",
        route: "/soveti",
      },
      GUIDE: {
        title: "Гид по Пхукету",
        route: "/gid",
      },
    },
  },
};
