import type { Config } from "tailwindcss";
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
} satisfies Config;
