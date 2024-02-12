import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import ThemeContext from "../../contexts/ThemeContext";

export default function CustomToasts() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            backgroundColor: darkTheme ? "#1D1F23" : "#FFFFFF",
            color: darkTheme ? "#E7E9EA" : "#000000",
          },
          className: "text-sm font-semibold",
          iconTheme: {
            primary: "#549c47",
            secondary: "#FFFFFF",
          },
        },
        error: {
          style: {
            backgroundColor: darkTheme ? "#1D1F23" : "#FFFFFF",
            color: darkTheme ? "#E7E9EA" : "#000000",
          },
          className: "text-sm font-semibold",
          iconTheme: {
            primary: "#ef4444",
            secondary: "#FFFFFF",
          },
        },
        position: "top-center",
        duration: 2000,
      }}
    />
  );
}
