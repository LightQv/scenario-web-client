import { useContext, useLayoutEffect, useState } from "react";
import GenresContext from "../contexts/GenresContext";

export default function useGenre(data, media_type) {
  const { movieGenres, tvGenres } = useContext(GenresContext);
  const [genre, setGenre] = useState(null);

  //--- Determine which type of Result and return Genre name based on ID ---//
  useLayoutEffect(() => {
    function getGenreNames() {
      if (data.media_type === "movie" || media_type === "movie") {
        const genresNames = [];
        for (let i = 0; i < movieGenres?.length; i++) {
          if (data.genre_ids?.includes(movieGenres[i].id))
            genresNames.push(movieGenres[i].name);
        }
        return setGenre(genresNames);
      }
      if (data.media_type === "tv" || media_type === "tv") {
        const genresNames = [];
        for (let i = 0; i < tvGenres?.length; i++) {
          if (data.genre_ids?.includes(tvGenres[i].id))
            genresNames.push(tvGenres[i].name);
        }
        return setGenre(genresNames);
      }
    }
    getGenreNames();
  }, [data.genre_ids, data.media_type, media_type, movieGenres, tvGenres]);
  return genre;
}
