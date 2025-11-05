import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { instanceAPI } from "../services/instances";
import PropTypes from "prop-types";
import UserContext from "./UserContext";
import { notifyError } from "../components/toasts/Toast";
import { useTranslation } from "react-i18next";

const BookmarkContext = createContext({});

export default BookmarkContext;

export function UserBookmarks({ children }) {
  const { user } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [sendBookmark, setSendBookmark] = useState(false);
  const { t } = useTranslation();

  const bookmarksObj = useMemo(() => {
    return {
      bookmarks,
      bookmarkCount,
      sendBookmark,
      setSendBookmark,
    };
  }, [bookmarks, bookmarkCount, sendBookmark]);

  useEffect(() => {
    if (user.id) {
      instanceAPI
        .get(`/api/v1/bookmarks/${user.id}`)
        .then(({ data }) => {
          setBookmarks(data);
          setBookmarkCount(data.length);
          setSendBookmark(false);
        })
        .catch(() => notifyError(t("toast.error")));
    }
  }, [user.id, sendBookmark, t]);

  return (
    <BookmarkContext.Provider value={bookmarksObj}>
      {children}
    </BookmarkContext.Provider>
  );
}

UserBookmarks.propTypes = {
  children: PropTypes.element,
};
