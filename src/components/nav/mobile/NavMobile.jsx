import { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import ThemeContext from "../../../contexts/ThemeContext";
import BookmarkContext from "../../../contexts/BookmarkContext";
import { useTranslation } from "react-i18next";
import { loggedData, navData } from "../../../services/data";
import MobileDropdown from "./MobileDropdown";
import ThemeSwitch from "../../ui/ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import logoLight from "../../../assets/logo/SCENARIO_b.svg";
import logoDark from "../../../assets/logo/SCENARIO_w.svg";
import BurgerSvg from "../../svg/nav/BurgerSvg";
import SearchSvg from "../../svg/nav/SearchSvg";
import TopSvg from "../../svg/nav/TopSvg";
import WatchlistSvg from "../../svg/nav/WatchlistSvg";
import ProfileSvg from "../../svg/nav/ProfileSvg";
import CloseSvg from "../../svg/nav/CloseSvg";
import DiscoverSvg from "../../svg/nav/DiscoverSvg";
import PropTypes from "prop-types";
import Button from "../../ui/Button";

export default function NavMobile({
  setShowSearch,
  showBurger,
  setShowBurger,
  setShowAuth,
}) {
  const location = useLocation();
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext);
  const { user, logout, loading } = useContext(UserContext);
  const { bookmarkCount } = useContext(BookmarkContext);
  const [topDropdown, setTopDropdown] = useState(false);
  const [discoverDropdown, setDiscoverDropdown] = useState(false);

  return (
    <nav
      className={`fixed z-30 flex h-12 w-full px-4 py-2 font-fira ${
        showBurger || location.pathname !== "/"
          ? "bg-theme-light-bg-opacity text-theme-light-text-primary dark:bg-theme-dark-bg-opacity dark:text-theme-dark-text-primary"
          : "bg-transparent text-theme-light-text-secondary"
      }`}
    >
      <Link to="/" className="w-24" onClick={() => setShowBurger(false)}>
        <img
          src={
            darkTheme || (location.pathname === "/" && !showBurger)
              ? logoDark
              : logoLight
          }
          alt="logo"
          className="h-full w-full"
        />
      </Link>
      <button
        type="button"
        onClick={() => setShowBurger(!showBurger)}
        className="ml-auto"
      >
        {showBurger ? <CloseSvg /> : <BurgerSvg />}
      </button>
      <ul
        className={`${
          showBurger ? "opacity-100" : "hidden opacity-0"
        } fixed bottom-0 left-0 flex h-[calc(100dvh-3rem)] w-screen flex-col items-center justify-center gap-6 bg-theme-light-bg-opacity p-4 text-xl transition-all dark:bg-theme-dark-bg-opacity`}
      >
        {/* Search Button that open Seach Modal */}
        <li className="mt-auto">
          <button
            type="button"
            onClick={() => setShowSearch(true)}
            className={`flex items-center gap-2
            ${
              location.pathname === "/search" &&
              "text-theme-light-main dark:text-theme-dark-main"
            }`}
          >
            <SearchSvg />
            <p>{t("navigation.link1").toUpperCase()}</p>
          </button>
        </li>
        {/* Top Dropdown */}
        <MobileDropdown
          data={navData}
          path="top"
          setShowBurger={setShowBurger}
          dropdown={topDropdown}
          setDropdown={setTopDropdown}
          title={t("navigation.link2.title")}
          icon={<TopSvg />}
        />
        {/* Discover Dropdown */}
        <MobileDropdown
          data={navData}
          path="discover"
          setShowBurger={setShowBurger}
          dropdown={discoverDropdown}
          setDropdown={setDiscoverDropdown}
          title={t("navigation.link3.title")}
          icon={<DiscoverSvg />}
        />
        {user.id &&
          loggedData &&
          loggedData.map((el) => (
            <li key={el.id}>
              <NavLink
                to={el.path}
                className={({ isActive }) => `flex items-center gap-2
                          ${
                            isActive &&
                            "text-theme-light-main dark:text-theme-dark-main"
                          }`}
                onClick={() => setShowBurger(false)}
              >
                {el.title === t("navigation.link4") && (
                  <div className="relative">
                    <WatchlistSvg />
                    {bookmarkCount > 0 && (
                      <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {bookmarkCount}
                      </span>
                    )}
                  </div>
                )}
                {el.title === t("navigation.link5") && <ProfileSvg />}
                <p className="uppercase">{el.title}</p>
              </NavLink>
            </li>
          ))}
        {user.id ? (
          <Button
            onClick={logout}
            disabled={loading}
            isLoading={loading}
            activeColor="active:border-theme-light-main active:text-theme-light-main dark:active:border-theme-dark-main dark:active:text-theme-dark-main"
          >
            {t("auth.form.submit.logout")}
          </Button>
        ) : (
          <Button
            onClick={() => setShowAuth(true)}
            activeColor="active:border-theme-light-main active:text-theme-light-main dark:active:border-theme-dark-main dark:active:text-theme-dark-main"
          >
            {t("auth.form.submit.login")}
          </Button>
        )}
        <section className="mt-auto flex w-full items-center gap-4 text-sm">
          <ThemeSwitch />
          <div className="ml-auto">
            <LanguageSwitch />
          </div>
        </section>
      </ul>
    </nav>
  );
}

NavMobile.propTypes = {
  setShowSearch: PropTypes.func.isRequired,
  showBurger: PropTypes.bool.isRequired,
  setShowBurger: PropTypes.func.isRequired,
  setShowAuth: PropTypes.func.isRequired,
};
