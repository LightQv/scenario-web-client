import Selector from "../../../components/Selector";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function GenreSelector({ genre }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const changeGenre = (e) => {
    if (e.target.value === "0") {
      searchParams.delete("genre");
    } else {
      searchParams.set("genre", e.target.value);
    }
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!genre) return null;
  return (
    <div className="mx-auto my-2 flex w-fit items-center justify-center gap-2 lg:ml-auto lg:mr-5">
      <h1 className="text-xs">{t("filter.title")}</h1>
      <Selector
        defaultValue={searchParams.get("genre") || "0"}
        onChange={changeGenre}
      >
        <option value={"0"}>{t("filter.every")}</option>
        {genre.map((genre, index) => (
          <option key={index} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Selector>
    </div>
  );
}

GenreSelector.propTypes = {
  genre: PropTypes.arrayOf(PropTypes.shape()),
};
