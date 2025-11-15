import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Tutaj dodajemy nasze niestandardowe kolory i czcionki z prototypu
      colors: {
        'brand-background': '#121212',
        'brand-surface': '#1E1E1E',
        'brand-primary': '#FFBF00', // Nasz złoty akcent
        'brand-secondary': '#332A00',
        'brand-text': '#E0E0E0',
        'brand-text-secondary': '#B0B0B0',
      },
      fontFamily: {
        // 'sans' (czcionka body) będzie teraz używać naszej zmiennej --font-lato
        sans: ['var(--font-lato)', 'sans-serif'],
        // 'heading' będzie teraz używać naszej zmiennej --font-montserrat
        heading: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        // Dodajemy niestandardowe tło dla sekcji Hero
        'hero-pattern': "linear-gradient(rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 1)), url('https://placehold.co/1920x800/1E1E1E/333?text=T%C5%82o+z+Gry')",
      },
    },
  },
  plugins: [],
};
export default config;