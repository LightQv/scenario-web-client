import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useFilter(media) {
  const [searchParams] = useSearchParams();
  const [filteredList, setFilteredList] = useState([]);

  //--- Determine which type of Result and return Genre name based on ID ---//
  useLayoutEffect(() => {
    const currentGenre = searchParams.get("genre");
    setFilteredList(
      media?.filter((el) => {
        return el.genre_ids.includes(Number(currentGenre));
      })
    );
  }, [media, searchParams]);
  return filteredList;
}
