import { useTranslation } from "react-i18next";
import ContentBanner from "./components/content/ContentBanner";
import ContentHeader from "./components/content/ContentHeader";
import ContentList from "./components/content/ContentList";
import ContentProvider from "./components/content/ContentProvider";
import ContentScreenshot from "./components/content/ContentScreenshot";
import ContentRecommendation from "./components/content/ContentRecommendation";
import PropTypes from "prop-types";

export default function TvDetails({ data, setShowWatchlist }) {
  const { t } = useTranslation();
  return (
    <div className="w-full lg:mx-auto lg:w-[55%] lg:pt-8">
      <ContentBanner
        src={data.backdrop_path}
        alt={data.title}
        score={data.vote_average}
        videos={data.videos?.results}
        //--- Props for Watchlist Action ----//
        setShowWatchlist={setShowWatchlist}
        //--- Props for View Action ----//
        poster={data.poster_path}
        release={data.first_air_date}
        episodesNumber={data.number_of_episodes}
        title={data.name}
      />
      <ContentHeader
        title={data.name}
        genres={data.genres}
        status={data.status}
        start={data.first_air_date}
        end={data.last_air_date}
        seasonsNumber={data.number_of_seasons}
        episodesNumber={data.number_of_episodes}
        synopsis={data.overview}
        poster={data.poster_path}
      />
      <ContentList title={t("page.detail.media.cast")} />
      <ContentList
        title={t("page.detail.media.seasons.title")}
        data={data.seasons}
      />
      <ContentScreenshot contentId={data.id} />
      <ContentProvider contentId={data.id} />
      <ContentRecommendation contentId={data.id} />
    </div>
  );
}

TvDetails.propTypes = {
  data: PropTypes.shape().isRequired,
  setShowWatchlist: PropTypes.func,
};
