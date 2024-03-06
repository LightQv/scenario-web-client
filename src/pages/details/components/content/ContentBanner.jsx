import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../contexts/UserContext";
import { setScoreColor } from "../../../../services/utils";
import TrailerSvg from "../../../../components/svg/action/TrailerSvg";
import Dropdown from "../../../../components/ui/Dropdown";
import ContentAction from "./action/ContentAction";
import PropTypes from "prop-types";

export default function ContentBanner({
  src,
  alt,
  score,
  videos,
  setShowWatchlist,
  genres,
  poster,
  backdrop,
  release,
  runtime,
  episodesNumber,
  title,
}) {
  const { type } = useParams();
  const { user } = useContext(UserContext);
  const [trailerObj, setTrailerObj] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (videos) {
      const trailer = videos?.filter(
        (el) =>
          el.name.toUpperCase().includes("TRAILER") ||
          el.type.toUpperCase().includes("TRAILER")
      );
      if (trailer.some((el) => el.name.toUpperCase().includes("VOST"))) {
        setTrailerObj(
          trailer.filter((el) => el.name.toUpperCase().includes("VOST"))
        );
      } else setTrailerObj(trailer);
    }
  }, [videos]);

  return (
    <section className="relative w-full">
      <img
        src={`https://image.tmdb.org/t/p/original/${src}`}
        alt={alt}
        className="w-full border-[1px] border-theme-light-bg-third object-cover dark:border-theme-dark-bg-third"
      />
      <div className="absolute -bottom-7 right-3 flex items-center justify-center lg:-bottom-8">
        <p
          className={`flex h-14 w-14 items-center justify-center rounded-full font-abri text-base text-black shadow-md lg:h-16 lg:w-16 lg:text-xl ${setScoreColor(
            score
          )}`}
        >
          {score?.toFixed(1)}
        </p>
      </div>
      {trailerObj && trailerObj.length > 0 && (
        <div className="absolute -bottom-5 right-[4.5rem] flex items-center justify-center lg:-bottom-6 lg:right-[5.5rem]">
          <a
            className="m-auto flex h-10 w-10 items-center justify-center rounded-full bg-theme-light-bg-third font-abri text-base shadow-sm transition-all hover:bg-theme-light-bg-quad active:bg-theme-light-bg-quad lg:h-12 lg:w-12 lg:text-xl dark:bg-theme-dark-bg-third dark:text-theme-dark-text-primary dark:hover:bg-theme-dark-bg-quad dark:active:bg-theme-dark-bg-quad"
            href={`https://www.youtube.com/watch?v=${trailerObj[0].key}`}
            target="_blank"
            rel="noreferrer"
          >
            <TrailerSvg />
          </a>
        </div>
      )}
      {user.id && type !== "person" && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-theme-light-bg-primary transition-all hover:bg-theme-light-bg-quad dark:bg-theme-dark-bg-primary dark:hover:bg-theme-dark-bg-quad">
          <Dropdown dropdown={dropdown} setDropdown={setDropdown}>
            <ContentAction
              setShowModal={setShowWatchlist}
              genres={genres}
              poster={poster}
              backdrop={backdrop}
              release={release}
              runtime={runtime}
              episodesNumber={episodesNumber}
              title={title}
            />
          </Dropdown>
        </div>
      )}
    </section>
  );
}

ContentBanner.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  score: PropTypes.number.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape()),
  setShowWatchlist: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.shape()),
  poster: PropTypes.string,
  backdrop: PropTypes.string,
  release: PropTypes.string,
  runtime: PropTypes.number,
  episodesNumber: PropTypes.number,
  title: PropTypes.string,
};
