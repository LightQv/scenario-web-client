import { createContext, useEffect, useMemo, useState } from "react";
import instanceTmdb from "../services/instances";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const GenresContext = createContext({});

export default GenresContext;

export function MovieGenres({ children }) {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [totalGenres, setTotalGenres] = useState([]);
  const { i18n } = useTranslation();

  const genresObj = useMemo(() => {
    return {
      movieGenres,
      tvGenres,
      totalGenres,
    };
  }, [movieGenres, tvGenres, totalGenres]);

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

  useEffect(() => {
    const fullGenreArr = movieGenres
      .concat(tvGenres)
      .sort((a, b) => a.name.localeCompare(b.name));
    const removeDuplicate = fullGenreArr.filter((el, index) => {
      return index === fullGenreArr.findIndex((obj) => el.id === obj.id);
    });
    setTotalGenres(removeDuplicate);
  }, [movieGenres, tvGenres]);

  return (
    <GenresContext.Provider value={genresObj}>
      {children}
    </GenresContext.Provider>
  );
}

MovieGenres.propTypes = {
  children: PropTypes.element,
};
