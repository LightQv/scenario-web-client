import PropTypes from "prop-types";

export default function PersonBanner({ src, alt }) {
  return (
    <section className="h-fit w-full lg:hidden">
      <img
        src={`https://image.tmdb.org/t/p/original/${src}`}
        alt={alt}
        className="mx-auto h-full w-full object-cover object-top lg:object-center"
      />
    </section>
  );
}

PersonBanner.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
