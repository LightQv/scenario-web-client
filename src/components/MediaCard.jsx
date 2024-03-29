import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { durationConvert, formatFullDate } from "../services/utils";
import PropTypes from "prop-types";
import { useView } from "../hooks/useView";
import ViewSvg from "./svg/action/ViewSvg";
import DeleteSvg from "./svg/action/DeleteSvg";
import ShiftSvg from "./svg/action/ShiftSvg";

export default function MediaCard({
  data,
  showEdit,
  setShowEditShift,
  setShowEditDelete,
  setSelectedMedia,
}) {
  const location = useLocation();
  const { viewed } = useView(data.tmdb_id, data.media_type);
  const { t } = useTranslation();

  const handleMediaDelete = () => {
    setSelectedMedia(data.id);
    setShowEditDelete(true);
  };
  const handleMediaShift = () => {
    setSelectedMedia(data);
    setShowEditShift(true);
  };

  return (
    <li
      className={`${
        !showEdit &&
        "hover:bg-theme-light-bg-secondary dark:hover:bg-theme-dark-bg-secondary"
      } relative flex px-5 py-2 font-fira after:absolute after:bottom-0 after:left-[50%] after:w-[calc(100%-2.5rem)] after:-translate-x-[50%] after:border-b-[1px] after:border-gray-200 last:after:border-none lg:after:hidden dark:after:border-theme-dark-bg-third`}
    >
      <Link
        aria-disabled={showEdit}
        to={!showEdit && `/details/${data.media_type}/${data.tmdb_id}`}
        className="relative flex h-fit w-full items-center justify-between"
      >
        <div className="flex h-full w-full items-center justify-start gap-4 pr-2 transition-all">
          {showEdit && (
            <>
              <button
                className="text-theme-light-secondary dark:text-theme-dark-secondary"
                onClick={() => handleMediaDelete()}
              >
                <DeleteSvg />
              </button>
              <button
                className="text-theme-light-main dark:text-theme-dark-main"
                onClick={() => handleMediaShift()}
              >
                <ShiftSvg />
              </button>
            </>
          )}
          <section className="h-full">
            <h1 className="line-clamp-1 font-abri text-base lg:text-lg">
              {data.title}
            </h1>
            <h2 className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
              {data.media_type === "movie" &&
                `${formatFullDate(data.release_date)} • ${durationConvert(
                  data.runtime
                )}`}
              {data.media_type === "tv" &&
                `${formatFullDate(data.release_date)} • 
                ${
                  data.runtime > 1
                    ? `${data.runtime} ${t(
                        "page.detail.media.seasons.episode.plurial"
                      )}`
                    : `${data.runtime} ${t(
                        "page.detail.media.seasons.episode.singular"
                      )}`
                }`}
            </h2>
          </section>
          {viewed && location.pathname !== "/profile" && (
            <section className="ml-auto flex stroke-theme-light-main dark:stroke-theme-dark-main">
              <ViewSvg />
            </section>
          )}
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
          alt={data.name}
          className="h-16 rounded-sm border-[1px] border-theme-light-bg-third object-cover lg:h-24 dark:border-theme-dark-bg-third"
        />
      </Link>
    </li>
  );
}

MediaCard.propTypes = {
  data: PropTypes.shape().isRequired,
  showEdit: PropTypes.bool,
  setShowEditDelete: PropTypes.func,
  setShowEditShift: PropTypes.func,
  setSelectedMedia: PropTypes.func,
};
