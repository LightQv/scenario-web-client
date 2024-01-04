import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import GenresContext from "../../../../contexts/GenresContext";
import PropTypes from "prop-types";

export default function GenreSelector({ scrollTop, showFilter }) {
  const { movieGenres, tvGenres } = useContext(GenresContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const changeGenre = (e) => {
    if (e.target.value === "0") {
      searchParams.delete("genre");
    } else {
      searchParams.set("genre", e.target.value);
    }
    const pageNumber = 1;
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Script to determine if which genre Array to map
  const chooseDataType = () => {
    if (searchParams.get("media") === "movie")
      return movieGenres.sort((a, b) => a.name.localeCompare(b.name));
    if (searchParams.get("media") === "tv")
      return tvGenres.sort((a, b) => a.name.localeCompare(b.name));
  };

  if (!movieGenres || !tvGenres || !searchParams.get("media")) return null;
  return (
    <section
      className={`${
        scrollTop !== 0 || !showFilter ? "hidden opacity-0" : "flex opacity-100"
      } items-center gap-2 transition-all`}
    >
      <h1 className="text-xs">{t("filter.title")}</h1>
      <select
        defaultValue={searchParams.get("genre") || undefined}
        onChange={changeGenre}
        className="h-fit w-fit rounded-md border-[1px] border-theme-light-text-primary bg-transparent px-4 py-2 text-xs hover:cursor-pointer hover:border-theme-light-main hover:text-theme-light-main dark:border-theme-dark-text-primary dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main"
      >
        <option value={"0"}>{t("filter.every")}</option>
        {chooseDataType()?.map((genre, index) => (
          <option value={genre.id} key={index}>
            {genre.name}
          </option>
        ))}
      </select>
    </section>
  );
}

GenreSelector.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  showFilter: PropTypes.bool.isRequired,
};
