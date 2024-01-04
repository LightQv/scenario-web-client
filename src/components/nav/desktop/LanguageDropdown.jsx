import { useTranslation } from "react-i18next";
import { languageList } from "../../../services/lng";
import { useEffect, useState } from "react";
import DropdownSvg from "../../svg/action/dropdown/DropdownSvg";
import { useLocation } from "react-router-dom";

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();

  const changeLng = (e) => {
    i18n.changeLanguage(e);
    localStorage.setItem("lng", e);
    setOpenDropdown(false);
  };

  useEffect(() => {
    setOpenDropdown(false);
  }, [location.pathname]);

  const getActiveLng = languageList.filter(
    (el) => el.tag === localStorage.getItem("lng")
  );

  if (!languageList) return null;
  return (
    <div className="relative h-fit w-fit bg-transparent hover:cursor-pointer">
      {getActiveLng.length > 0 ? (
        <button
          type="button"
          onMouseEnter={() => setOpenDropdown(true)}
          className="flex items-center gap-1 text-center"
        >
          {getActiveLng[0]?.icon} {getActiveLng[0]?.name} <DropdownSvg />
        </button>
      ) : (
        <button
          type="button"
          onMouseEnter={() => setOpenDropdown(true)}
          className="flex items-center gap-1 text-center"
        >
          {languageList[0]?.icon} {languageList[0]?.name} <DropdownSvg />
        </button>
      )}
      {openDropdown && (
        <div
          className="absolute right-0 top-8 z-50 flex h-fit w-20 flex-col rounded-md border-[1px] border-theme-light-bg-third bg-theme-light-bg-primary text-theme-light-text-primary shadow-md dark:border-theme-dark-bg-third dark:bg-theme-dark-bg-secondary dark:text-theme-dark-text-primary dark:shadow-none"
          onMouseLeave={() => setOpenDropdown(false)}
        >
          {languageList.map((lng) => (
            <button
              aria-disabled={localStorage.getItem("lng") === lng.tag}
              type="button"
              key={lng.id}
              onClick={() => changeLng(lng.tag)}
              className={`h-fit w-full border-t-[1px] border-theme-light-bg-third px-4 py-2 text-end first:border-none hover:bg-theme-light-bg-third dark:border-theme-dark-bg-third dark:hover:bg-theme-dark-bg-third ${
                localStorage.getItem("lng") === lng.tag
                  ? "cursor-default text-theme-light-main dark:text-theme-dark-main"
                  : ""
              }`}
            >
              {lng.icon} {lng.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
