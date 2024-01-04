import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import instanceTmdb from "../../../../services/instances";
import ProvidersBanner from "./ProvidersBanner";
import { notifyError } from "../../../../components/toasts/Toast";
import Carousel from "../../../../components/Carousel";
import PropTypes from "prop-types";

export default function ContentProvider({ contentId }) {
  const { type } = useParams();
  const [providers, setProviders] = useState(null);
  const [localProvider, setLocalProvider] = useState(null);
  const { t, i18n } = useTranslation();

  //--- Fetch World's Providers's list ---//
  useEffect(() => {
    if (contentId) {
      instanceTmdb
        .get(`/${type}/${contentId}/watch/providers`)
        .then(({ data }) => {
          setProviders(data.results);
        })
        .catch(() => {
          notifyError(t("toast.error"));
        });
    }
  }, [type, contentId, t]);

  //--- Determine the right list based on navigator's language ---//
  useEffect(() => {
    if (providers) {
      for (const key in providers) {
        if (
          key === i18n.resolvedLanguage?.toUpperCase() ||
          i18n.language.includes(key)
        ) {
          setLocalProvider(providers[key]);
        }
      }
    }
  }, [providers, i18n.resolvedLanguage, i18n.language]);

  if (!localProvider) return null;
  return (
    <section className="relative flex flex-col gap-2 border-b-[1px] border-gray-200 pb-3 pt-2 lg:mx-5 lg:gap-4 lg:py-4 dark:border-theme-dark-bg-third">
      <h1 className="px-5 font-abri text-lg lg:px-0 lg:text-2xl">
        {t("page.detail.media.providers.title")}
      </h1>
      {localProvider && (
        <Carousel
          leftPosition="-left-20 top-[calc(50%-4rem)]"
          rightPosition="-right-20 top-[calc(50%-4rem)]"
          containerHeight="h-40"
          btnHeight="h-8"
          btnWidth="w-8"
          textSize="text-xl"
          leftScrollLength={-200}
          rightScrollLength={200}
        >
          <ProvidersBanner
            title={t("page.detail.media.providers.subtitle1")}
            datas={localProvider.flatrate}
          />
          {localProvider.flatrate && localProvider.buy && (
            <div className="h-24 w-1 self-center border-l-[1px] border-gray-200 lg:mx-5 dark:border-theme-dark-bg-third" />
          )}
          <ProvidersBanner
            title={t("page.detail.media.providers.subtitle2")}
            datas={localProvider.buy}
          />
        </Carousel>
      )}
    </section>
  );
}

ContentProvider.propTypes = {
  contentId: PropTypes.number.isRequired,
};
