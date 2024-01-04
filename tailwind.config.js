/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "3xl": "2560px",
      },
      fontFamily: {
        abri: ["var(--font-abri)"],
        fira: ["var(--font-fira)"],
        dela: ["var(--font-dela)"],
      },
      colors: {
        grade: {
          light: {
            excellent: "#549c47",
            good: "#adc178",
            average: "#eab208",
            bad: "#ef4444",
          },
          dark: {
            excellent: "#82c177",
            good: "#c6d4a1",
            average: "#f9cd4a",
            bad: "#f47c7c",
          },
        },
        toast: {
          light: {
            success: "#549c47",
            warning: "#fb8b24",
            error: "#ef4444",
            promise: "#eab208",
          },
          dark: {
            success: "#82c177",
            warning: "#fcae66",
            error: "#f47c7c",
            promise: "#f9cd4a",
          },
        },
        theme: {
          light: {
            bg: {
              primary: "#FFFFFF",
              secondary: "#F7F7F7",
              third: "#E5E7EB",
              quad: "#D1D5DB",
              opacity: "#FFFFFFF2",
            },
            text: {
              primary: "#000000",
              secondary: "#FFFFFF",
            },
            main: "#eab208",
            secondary: "#EA0B17",
          },
          dark: {
            bg: {
              primary: "#121212",
              secondary: "#16181C",
              third: "#1D1F23",
              quad: "#5a606c",
              opacity: "#121212F2",
              blury: "#121212CC",
            },
            text: {
              primary: "#E7E9EA",
              secondary: "#71767B",
            },
            main: "#f9cd4a",
            secondary: "#c92c35",
          },
        },
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        toast: "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
      },
      lineClamp: {
        8: "8",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
