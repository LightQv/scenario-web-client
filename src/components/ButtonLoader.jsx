import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { Oval } from "react-loader-spinner";

export default function ButtonLoader() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <Oval
      ariaLabel="oval-loading"
      color={darkTheme ? "#f9cd4a" : "#eab208"}
      secondaryColor={darkTheme ? "#f9cd4a" : "#eab208"}
      height={20}
      width={20}
      strokeWidth={6}
    />
  );
}
