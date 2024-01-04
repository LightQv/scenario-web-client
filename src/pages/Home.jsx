import { useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import ThemeContext from "../contexts/ThemeContext";
import UserContext from "../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { notifyError } from "../components/toasts/Toast";

export default function Home() {
  const { darkTheme } = useContext(ThemeContext);
  const { logout } = useContext(UserContext);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  //--- If session expired, logout and notify ---//
  useEffect(() => {
    if (searchParams.has("expired")) {
      logout();
      notifyError(t("toast.expired"));
      setSearchParams(() => {
        return undefined;
      });
    }
  }, [searchParams, setSearchParams, logout, t]);

  return (
    <main
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg)`,
        backgroundPosition: "center",
        backgroundColor: darkTheme ? "#1D1F23" : "#EA0B17",
        backgroundBlendMode: "multiply",
        filter: (darkTheme && "grayscale(1)") || undefined,
      }}
      className="relative flex h-[100dvh] flex-col items-center justify-center font-fira text-theme-light-text-secondary dark:text-theme-dark-text-primary"
    >
      <section className="text-center">
        <h1 className="font-dela text-[6.5rem] leading-[6.5rem] lg:text-[7.5rem] lg:leading-[8rem]">
          シナリオへようこそ
        </h1>
        <p className="font-abri text-lg lg:text-2xl">
          {t("page.home.title").toUpperCase()}
        </p>
      </section>
    </main>
  );
}
