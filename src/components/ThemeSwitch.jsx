import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import LightSvg from "./svg/theme/LightSvg";
import DarkSvg from "./svg/theme/DarkSvg";
import SystemSvg from "./svg/theme/SystemSvg";

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <DarkSvg /> : <LightSvg />}
      </button>
      <div className="h-full w-[1px] bg-theme-light-bg-third lg:h-[60%] dark:bg-theme-dark-bg-third" />
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`${
          theme === "system"
            ? "text-theme-light-main dark:text-theme-dark-main"
            : ""
        }`}
      >
        <SystemSvg />
      </button>
    </>
  );
}
