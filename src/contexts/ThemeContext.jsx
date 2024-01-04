import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext({});

export default ThemeContext;

export function AppTheme({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  //--- Listen to User's system prefered color scheme ---//
  const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

  //--- Dark Theme === TRUE : when selected theme is "dark" OR when there is no theme in Local Storage AND prefered color scheme is dark ---//
  const darkTheme =
    theme === "dark" || (!("theme" in localStorage) && darkMedia.matches);

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        if (
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) && darkMedia.matches)
        ) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        break;
    }
  }, [theme, darkMedia.matches]);

  const whichTheme = useMemo(() => {
    return {
      darkTheme,
      theme,
      setTheme,
    };
  }, [theme, darkTheme]);

  return (
    <ThemeContext.Provider value={whichTheme}>{children}</ThemeContext.Provider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.element,
};
