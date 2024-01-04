import PropTypes from "prop-types";

export default function Button({
  onSubmit,
  onClick,
  disabled,
  disableColor,
  activeColor,
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
    </button>
  );
}

Button.propTypes = {
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.shape(),
  disableColor: PropTypes.string,
  activeColor: PropTypes.string,
  children: PropTypes.string,
};
