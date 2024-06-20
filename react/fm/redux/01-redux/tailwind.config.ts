import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: { ...colors, primary: colors.purple },
    },
  },
  plugins: [],
} satisfies Config;
