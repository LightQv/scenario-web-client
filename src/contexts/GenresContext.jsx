import { createContext, useEffect, useMemo, useState } from "react";
import instanceTmdb from "../services/instances";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const GenresContext = createContext({});

export default GenresContext;

export function MovieGenres({ children }) {
  const [movieGenres, setMovieGenres] = useState(null);
  const [tvGenres, setTvGenres] = useState(null);
  const { i18n } = useTranslation();

  const genresObj = useMemo(() => {
    return {
      movieGenres,
      tvGenres,
    };
  }, [movieGenres, tvGenres]);

  useEffect(() => {
    instanceTmdb
      .get(`/genre/movie/list?language=${i18n.language}`)
      .then(({ data }) => {
        setMovieGenres(data.genres);
      })
      .catch((err) => console.error(err));

    instanceTmdb
      .get(`/genre/tv/list?language=${i18n.language}`)
      .then(({ data }) => {
        setTvGenres(data.genres);
      })
      .catch((err) => console.error(err));
  }, [i18n.language]);

  return (
    <GenresContext.Provider value={genresObj}>
      {children}
    </GenresContext.Provider>
  );
}

MovieGenres.propTypes = {
  children: PropTypes.element,
};
