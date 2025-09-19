import PropTypes from "prop-types";
import ButtonLoader from "./ButtonLoader";

export default function Button({
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
      type={onSubmit ? "submit" : "button"}
      disabled={disabled}
      onSubmit={() => onSubmit}
      onClick={onClick}
      className={`${disableColor} ${activeColor} rounded-md border-[1px]
      border-current bg-transparent px-4
  py-2 text-xs transition-all`}
    >
      {children}
      {isLoading && <ButtonLoader />}
    </button>
  );
}

Button.propTypes = {
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  disableColor: PropTypes.string,
  activeColor: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.string,
};
