import PropTypes from "prop-types";

export default function SubmitBtn({
  onSubmit,
  onClick,
  disabled,
  disableColor,
  activeColor,
  children,
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onSubmit={() => onSubmit}
      onClick={onClick}
      className={`${disableColor} ${activeColor} w-fit cursor-pointer rounded-md border-[1px] bg-transparent px-4 py-2 text-sm font-semibold transition-all disabled:cursor-default`}
    >
      {children}
    </button>
  );
}

SubmitBtn.propTypes = {
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  disableColor: PropTypes.string,
  activeColor: PropTypes.string,
  children: PropTypes.string,
};
