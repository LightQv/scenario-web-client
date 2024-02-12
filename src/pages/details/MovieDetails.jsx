import { useTranslation } from "react-i18next";
import ContentBanner from "./components/content/ContentBanner";
import ContentHeader from "./components/content/ContentHeader";
import ContentList from "./components/content/ContentList";
import ContentProvider from "./components/content/ContentProvider";
import ContentScreenshot from "./components/content/ContentScreenshot";
import ContentRecommendation from "./components/content/ContentRecommendation";
import PropTypes from "prop-types";

export default function MovieDetails({ data, setShowWatchlist }) {
  const { t } = useTranslation();
  return (
    <div className="w-full lg:mx-auto lg:w-3/5 lg:pt-6">
      <ContentBanner
        src={data.backdrop_path}
        alt={data.title}
        score={data.vote_average}
        videos={data.videos?.results}
        //--- Props for Watchlist Action ----//
        setShowWatchlist={setShowWatchlist}
        //--- Props for View Action ----//
        genres={data.genres}
        poster={data.poster_path}
        backdrop={data.backdrop_path}
        release={data.release_date}
        runtime={data.runtime}
        title={data.title}
      />
      <ContentHeader
        title={data.title}
        original_title={data.original_title}
        genres={data.genres}
        release={data.release_date}
        runtime={data.runtime}
        synopsis={data.overview}
        poster={data.poster_path}
      />
      <ContentList title={t("page.detail.media.cast")} />
      <ContentScreenshot contentId={data.id} />
      <ContentProvider contentId={data.id} />
      <ContentRecommendation contentId={data.id} />
    </div>
  );
}

MovieDetails.propTypes = {
  data: PropTypes.shape().isRequired,
  setShowWatchlist: PropTypes.func,
};
