import { Toaster } from "react-hot-toast";

export default function CustomToasts() {
  return (
    <Toaster
      toastOptions={{
        success: {
          className:
            "bg-theme-light-bg-primary text-theme-light-text-primary dark:bg-theme-dark-bg-quad dark:text-theme-dark-text-primary text-sm font-semibold",
          iconTheme: {
            primary: "#549c47",
            secondary: "#FFFFFF",
          },
        },
        error: {
          className:
            "bg-theme-light-bg-primary text-theme-light-text-primary dark:bg-theme-dark-bg-quad dark:text-theme-dark-text-primary text-sm font-semibold",
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
