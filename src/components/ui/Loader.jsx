import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <ThreeDots
      ariaLabel="three-dots-loading"
      color={darkTheme ? "#f9cd4a" : "#eab208"}
      height={50}
      width={50}
      radius={9}
    />
  );
}
