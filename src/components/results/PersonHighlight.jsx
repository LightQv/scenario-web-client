import { Link } from "react-router-dom";
import { formatFullDate } from "../../services/utils";
import PropTypes from "prop-types";

export default function PersonHighlight({ el, index }) {
  return (
    <li>
      <Link
        to={`/details/${el.media_type}/${el.id}`}
        className={`flex items-center gap-2 ${
          index === 0 ? "lg:gap-4" : "lg:gap-2"
        }`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${
            el?.poster_path || el?.profile_path
          }`}
          alt=""
          className={`h-14 rounded-sm object-cover ${
            index === 0 ? "lg:h-[9.25rem]" : "lg:h-16"
          }`}
        />
        <section>
          <h3
            className={`line-clamp-1 text-xs font-semibold ${
              index === 0 ? "lg:line-clamp-6 lg:text-base" : "lg:line-clamp-4"
            }`}
          >
            {el?.title || el?.name}
          </h3>
          <p
            className={`text-xs italic dark:text-theme-dark-text-secondary ${
              index === 0 ? "lg:text-sm" : ""
            }`}
          >
            {formatFullDate(el?.release_date) || el?.first_air_date}
          </p>
        </section>
      </Link>
    </li>
  );
}

PersonHighlight.propTypes = {
  el: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
