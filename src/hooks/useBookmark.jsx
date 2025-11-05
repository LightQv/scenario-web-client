import { useContext, useLayoutEffect, useState } from "react";
import BookmarkContext from "../contexts/BookmarkContext";
import UserContext from "../contexts/UserContext";

export function useBookmark(tmdb_id) {
  const { user } = useContext(UserContext);
  const { bookmarks } = useContext(BookmarkContext);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkObj, setBookmarkObj] = useState(null);

  useLayoutEffect(() => {
    function verifyBookmark() {
      const isBookmarked = bookmarks?.some(
        (el) => el.tmdb_id === Number(tmdb_id)
      );
      setBookmarked(isBookmarked);
    }

    function getBookmarkObj() {
      const obj = bookmarks?.find(
        (el) => el.tmdb_id === Number(tmdb_id)
      );
      setBookmarkObj(obj || null);
    }

    verifyBookmark();
    getBookmarkObj();
  }, [tmdb_id, bookmarks, user.id]);

  return { bookmarked, bookmarkObj };
}
