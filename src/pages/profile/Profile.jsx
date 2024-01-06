import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/UserContext";
import ViewContext from "../../contexts/ViewContext";
import { instanceAPI } from "../../services/instances";
import { notifyError } from "../../components/toasts/Toast";
import ProfileBanner from "./components/ProfileBanner";
import ProfileHeader from "./components/ProfileHeader";
import ProfileViewList from "./components/ProfileViewList";
import ProfileStat from "./components/ProfileStat";
import Loader from "../../components/Loader";
import ScrollTopBtn from "../../components/ScrollTopBtn";
import GenresContext from "../../contexts/GenresContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { movieGenres, tvGenres } = useContext(GenresContext);
  const { movieViews, movieCount, movieRuntime, tvViews, tvCount, tvRuntime } =
    useContext(ViewContext);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id) {
      setLoading(true);
      instanceAPI
        .get(`/api/v1/user/banner/${user.id}`)
        .then((res) => {
          setBanner(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.request?.status !== 403) {
            notifyError(t("toast.error"));
          }
        });
    }
  }, [user.id, t]);

  return (
    <main className="relative flex min-h-screen justify-between bg-theme-light-bg-primary pt-12 font-fira 2xl:mx-auto 3xl:w-1/2 dark:bg-theme-dark-bg-primary dark:text-theme-dark-text-primary">
      {loading && (
        <div className="m-auto">
          <Loader />
        </div>
      )}
      {!loading && banner && user && (
        <div className="w-full lg:mx-auto lg:w-[55%] lg:pt-8">
          <ProfileBanner src={banner.profileBanner} />
          <ProfileHeader
            username={user.username}
            movieViewsCount={movieCount}
            tvViewsCount={tvCount}
            movieRuntime={movieRuntime}
            tvRuntime={tvRuntime}
          />
          <ProfileViewList
            title={t("page.profile.views.movieTitle")}
            data={movieViews}
            genre={movieGenres}
          />
          <ProfileViewList
            title={t("page.profile.views.tvTitle")}
            data={tvViews}
            genre={tvGenres}
          />
          {(movieViews || tvViews) && <ProfileStat />}
        </div>
      )}
      <ScrollTopBtn />
    </main>
  );
}
