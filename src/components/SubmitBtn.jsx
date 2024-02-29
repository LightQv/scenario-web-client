import PropTypes from "prop-types";
import ButtonLoader from "./ButtonLoader";

export default function SubmitBtn({
  onSubmit,
  onClick,
  disabled,
  disableColor,
  activeColor,
  isLoading,
  children,
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onSubmit={() => onSubmit}
      onClick={onClick}
      className={`${disableColor} ${activeColor} relative w-fit cursor-pointer overflow-hidden rounded-md border-[1px] bg-transparent px-4 py-2 text-sm font-semibold uppercase transition-all disabled:cursor-default`}
    >
      {children}
      {isLoading && <ButtonLoader />}
    </button>
  );
}

SubmitBtn.propTypes = {
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  disableColor: PropTypes.string,
  activeColor: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.string,
};
