import { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navData, loggedData } from "../../../services/data";
import UserContext from "../../../contexts/UserContext";
import ThemeContext from "../../../contexts/ThemeContext";
import DesktopDropdown from "./DesktopDropdown";
import LanguageDropdown from "./LanguageDropdown";
import ThemeSwitch from "../../ThemeSwitch";
import logoLight from "../../../assets/logo/SCENARIO_b.svg";
import logoDark from "../../../assets/logo/SCENARIO_w.svg";
import SearchSvg from "../../svg/nav/SearchSvg";
import TopSvg from "../../svg/nav/TopSvg";
import DiscoverSvg from "../../svg/nav/DiscoverSvg";
import WatchlistSvg from "../../svg/nav/WatchlistSvg";
import ProfileSvg from "../../svg/nav/ProfileSvg";
import PropTypes from "prop-types";
import Button from "../../Button";

export default function NavDesktop({ setShowSearch, setShowAuth }) {
  const location = useLocation();
  const { t } = useTranslation();
  const { darkTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(UserContext);
  const [topDropdown, setTopDropdown] = useState(false);
  const [discoverDropdown, setDiscoverDropdown] = useState(false);

  useEffect(() => {
    setTopDropdown(false);
    setDiscoverDropdown(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed z-50 flex h-16 w-full px-10 font-fira ${
        location.pathname !== "/"
          ? "bg-theme-light-bg-primary dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary"
          : "text-theme-light-text-secondary"
      }`}
    >
      <Link to="/" className="relative z-20 flex h-full w-[34rem]">
        <img
          src={darkTheme || location.pathname === "/" ? logoDark : logoLight}
          alt="logo"
          className="h-full w-28"
        />
      </Link>
      <section className="flex h-full w-full items-center justify-center gap-6 text-sm first:ml-auto">
        <ul className="flex items-center justify-center gap-6">
          {/* Search Button that open Seach Modal */}
          <li
            className={`
              ${
                location.pathname === "/search" &&
                "text-theme-light-main dark:text-theme-dark-main"
              } decoration-2 hover:underline hover:underline-offset-[12px] ${
                location.pathname !== "/"
                  ? "decoration-theme-light-main  dark:decoration-theme-dark-main"
                  : "decoration-theme-light-text-secondary  dark:decoration-theme-dark-text-primary"
              }`}
          >
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2"
            >
              <SearchSvg />
              <p>{t("navigation.link1").toUpperCase()}</p>
            </button>
          </li>
          {/* Top Dropdown */}
          <DesktopDropdown
            data={navData}
            path="top"
            dropdown={topDropdown}
            setDropdown={setTopDropdown}
            title={t("navigation.link2.title")}
            icon={<TopSvg />}
          />
          {/* Discover Dropdown */}
          <DesktopDropdown
            data={navData}
            path="discover"
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
                isActive
                  ? "text-theme-light-main dark:text-theme-dark-main"
                  : "decoration-theme-light-main decoration-2 hover:underline hover:underline-offset-[12px] dark:decoration-theme-dark-main"
              } decoration-2 hover:underline hover:underline-offset-[12px] ${
                location.pathname !== "/"
                  ? "decoration-theme-light-main  dark:decoration-theme-dark-main"
                  : "decoration-theme-light-text-secondary  dark:decoration-theme-dark-text-primary"
              }`}
                >
                  {el.title === t("navigation.link4") && <WatchlistSvg />}
                  {el.title === t("navigation.link5") && <ProfileSvg />}
                  <p>{el.title.toUpperCase()}</p>
                </NavLink>
              </li>
            ))}
        </ul>
      </section>
      <section className="ml-auto flex w-[34rem] items-center justify-end gap-4 text-sm">
        {user.id ? (
          <Button
            onClick={logout}
            activeColor="hover:border-theme-light-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main"
          >
            {t("auth.form.submit.logout")}
          </Button>
        ) : (
          <Button
            onClick={() => setShowAuth(true)}
            activeColor="hover:border-theme-light-main hover:text-theme-light-main dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main"
          >
            {t("auth.form.submit.login")}
          </Button>
        )}
        <ThemeSwitch />
        <LanguageDropdown />
      </section>
    </nav>
  );
}

NavDesktop.propTypes = {
  setShowSearch: PropTypes.func.isRequired,
  setShowAuth: PropTypes.func.isRequired,
};
