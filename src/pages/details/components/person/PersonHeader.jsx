import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function PersonHeader({ src, alt, name, job, bio }) {
  const { t } = useTranslation();
  return (
    <section className="mx-5 flex flex-col gap-2 border-b-[1px] border-gray-200 pt-3 lg:float-right lg:block dark:border-theme-dark-bg-third">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original/${src}`}
          alt={alt}
          className="hidden object-cover object-top lg:float-left lg:mb-6 lg:mr-6 lg:block lg:h-[35rem] lg:w-1/2"
        />
      </div>
      <h1 className="font-abri text-2xl lg:text-4xl">{name}</h1>
      <h2 className="-mt-1 text-xs italic lg:mt-2 lg:text-sm dark:text-theme-dark-text-secondary">
        {job}
      </h2>
      <p className="text-justify indent-4 text-xs leading-5 lg:mb-6 lg:mt-4 lg:text-base dark:text-theme-dark-text-secondary">
        {bio ? bio : t("error.noBiography")}
      </p>
    </section>
  );
}

PersonHeader.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  job: PropTypes.string,
  bio: PropTypes.string,
};
