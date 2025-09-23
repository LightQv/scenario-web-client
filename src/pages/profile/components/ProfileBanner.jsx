import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Dropdown from "../../../components/ui/Dropdown";
import BannerAction from "./action/BannerAction";
import { useLocation } from "react-router-dom";

export default function ProfileBanner({
  src,
  setBannerUpdated,
  setShowDeleteBanner,
}) {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <section className="relative h-fit w-full">
      {src ? (
        <img
          key={src}
          src={src}
          alt="profile_banner"
          className="h-56 w-full border-[1px] border-theme-light-bg-third object-cover lg:h-[25rem] dark:border-theme-dark-bg-third"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center border-[1px] border-theme-light-bg-third bg-theme-light-main object-cover lg:h-[25rem] dark:border-theme-dark-bg-third dark:bg-theme-dark-main">
          <p className="w-fit text-xl font-bold uppercase lg:text-3xl dark:text-theme-dark-text-secondary">
            {t("page.profile.noBanner.title")}
          </p>
        </div>
      )}
      {location.pathname === "/profile/settings" && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-theme-light-bg-primary transition-all hover:bg-theme-light-bg-quad dark:bg-theme-dark-bg-primary dark:hover:bg-theme-dark-bg-quad">
          <Dropdown dropdown={dropdown} setDropdown={setDropdown}>
            <BannerAction
              setShowModalDelete={setShowDeleteBanner}
              setUpdated={setBannerUpdated}
              poster={src}
            />
          </Dropdown>
        </div>
      )}
    </section>
  );
}

ProfileBanner.propTypes = {
  src: PropTypes.string,
  setBannerUpdated: PropTypes.func,
  setShowDeleteBanner: PropTypes.func,
};
