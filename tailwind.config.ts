import type { Config } from "tailwindcss";
export default {
  content: ["./shared/**/*.{vue,js,ts}", "./app/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
} satisfies Config;
