import PropTypes from "prop-types";

export default function ProvidersBanner({ title, datas }) {
  if (!datas) return null;
  return (
    <section className="flex w-fit flex-col gap-2">
      <h1 className="font-medium">{title}</h1>
      <ul className="flex w-fit gap-2 pb-1 lg:pb-0">
        {datas?.map((data, index) => (
          <li className="h-full w-20 flex-shrink-0" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.logo_path}`}
              alt=""
              className="h-20 w-20 rounded-md border-[1px] border-gray-100 object-cover dark:border-theme-dark-bg-third"
            />
            <h2 className="line-clamp-2 pt-1 text-center text-xs dark:text-theme-dark-text-secondary">
              {data.provider_name}
            </h2>
          </li>
        ))}
      </ul>
    </section>
  );
}

ProvidersBanner.propTypes = {
  title: PropTypes.string.isRequired,
  datas: PropTypes.arrayOf(PropTypes.shape()),
};
