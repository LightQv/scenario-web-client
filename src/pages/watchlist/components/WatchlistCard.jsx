import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowRightSvg from "../../../components/svg/action/ArrowRightSvg";
import PropTypes from "prop-types";

export default function WatchlistCard({ el }) {
  const { t } = useTranslation();
  return (
    <Link
      to={`/watchlist/${el.id}`}
      className="relative flex px-5 py-2 font-fira after:absolute after:bottom-0 after:left-[50%] after:w-[calc(100%-2.5rem)] after:-translate-x-[50%] after:border-b-[1px] after:border-gray-200 last:after:border-none hover:bg-theme-light-bg-secondary lg:after:hidden dark:after:border-theme-dark-bg-third dark:hover:bg-theme-dark-bg-secondary"
    >
      <li className="flex h-16 w-full items-center justify-between lg:h-24">
        <section className="flex h-full w-4/5 flex-col justify-center">
          <h1 className="line-clamp-1 font-abri text-base lg:text-lg">
            {el.title}
          </h1>
          <h2 className="text-xs italic lg:text-sm dark:text-theme-dark-text-secondary">
            {el._count.medias}{" "}
            {el._count.medias > 1
              ? t("page.watchlist.count.plurial")
              : t("page.watchlist.count.singular")}
          </h2>
        </section>
        <ArrowRightSvg />
      </li>
    </Link>
  );
}

WatchlistCard.propTypes = {
  el: PropTypes.shape(),
};
