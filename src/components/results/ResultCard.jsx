import { Link, useSearchParams } from "react-router-dom";
import { formatFullDate, setScoreColor } from "../../services/utils";
import { useTranslation } from "react-i18next";
import PersonHighlight from "./PersonHighlight";
import ViewSvg from "../svg/action/ViewSvg";
import PropTypes from "prop-types";
import { useView } from "../../hooks/useView";
import useGenre from "../../hooks/useGenre";
import UnviewSvg from "../svg/action/UnviewSvg";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function ResultCard({ data, index, media_type }) {
  const [searchParams] = useSearchParams();
  const genre = useGenre(data, media_type);
  const { user } = useContext(UserContext);
  const { viewed } = useView(data.id, searchParams.get("media"));
  const { t } = useTranslation();

  return (
    <li className="relative flex px-5 py-6 font-fira after:absolute after:bottom-0 after:left-[50%] after:w-[calc(100%-2.5rem)] after:-translate-x-[50%] after:border-b-[1px] after:border-gray-200 hover:bg-theme-light-bg-secondary lg:first:col-span-2 dark:after:border-theme-dark-bg-third dark:hover:bg-theme-dark-bg-secondary">
      <Link
        to={`/details/${data.media_type || media_type}/${data.id}`}
        className="flex w-full gap-2"
      >
        <div
          className={`flex h-full w-2/3 flex-col justify-between ${
            index === 0 ? "lg:w-[70%]" : "lg:w-2/3"
          }`}
        >
          <section>
            <div className="flex w-full items-center justify-between">
              <h1
                className={`line-clamp-1 font-abri text-base ${
                  index === 0
                    ? "lg:relative lg:z-10 lg:line-clamp-2 lg:h-fit lg:pb-2 lg:text-5xl lg:leading-[3.4rem]"
                    : "lg:text-lg"
                }`}
              >
                {data.title || data.name}
              </h1>
              {user.id && viewed && (
                <section className="stroke-theme-light-main dark:stroke-theme-dark-main">
                  <ViewSvg />
                </section>
              )}
              {user.id && !viewed && (
                <section className="stroke-theme-light-bg-quad dark:stroke-theme-dark-bg-quad">
                  <UnviewSvg />
                </section>
              )}
            </div>
            <h2
              className={`text-xs italic ${
                index === 0 ? "lg:text-base" : ""
              } dark:text-theme-dark-text-secondary`}
            >
              {data.media_type !== "person"
                ? formatFullDate(data.release_date || data.first_air_date)
                : data.known_for_department}
            </h2>
            {data.media_type !== "person" ? (
              <p
                className={`mt-1 line-clamp-4 text-xs leading-5 dark:text-theme-dark-text-secondary ${
                  index === 0 ? "lg:line-clamp-6 lg:text-lg" : "lg:line-clamp-5"
                }`}
              >
                {data.overview ? data.overview : t("error.noSynopsis")}
              </p>
            ) : (
              <ul className="mt-1 flex flex-col gap-1 lg:mt-5 lg:gap-2 dark:text-theme-dark-text-primary">
                {data.known_for.slice(0, 2).map((el, i) => (
                  <PersonHighlight key={i} el={el} index={index} />
                ))}
              </ul>
            )}
          </section>
          {data.media_type !== "person" && (
            <section>
              <ul className="flex gap-1 lg:gap-2">
                {genre?.slice(0, 2).map((genre, i) => (
                  <li
                    key={i}
                    className={`line-clamp-1 h-fit overflow-hidden rounded-2xl bg-theme-light-bg-third px-3 py-2 text-xs shadow-sm dark:bg-theme-dark-bg-third ${
                      index === 0 ? "lg:px-4" : ""
                    }`}
                  >
                    <p
                      className={`line-clamp-1 text-xs ${
                        index === 0 ? "lg:text-sm" : ""
                      }`}
                    >
                      {genre}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500/${
            data.poster_path || data.profile_path
          }`}
          alt={data.name}
          className={`min-h-[10.5rem] w-1/3 rounded-md border-[1px] border-theme-light-bg-third object-cover dark:border-theme-dark-bg-third ${
            index === 0 ? "lg:w-[30%]" : "lg:w-1/3"
          }`}
        />
        {data.media_type !== "person" && (
          <section className="absolute bottom-3 right-3 flex items-center justify-center">
            <p
              className={`flex h-10 w-10 items-center justify-center rounded-full font-abri text-sm text-black shadow-md ${
                index === 0 ? "lg:h-16 lg:w-16 lg:text-xl" : ""
              } ${setScoreColor(data.vote_average)}`}
            >
              {data.vote_average?.toFixed(1)}
            </p>
          </section>
        )}
      </Link>
    </li>
  );
}

ResultCard.propTypes = {
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  media_type: PropTypes.string,
};
