import PropTypes from "prop-types";

export default function Selector({ defaultValue, onChange, children }) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onChange(e)}
      className="h-fit w-fit rounded-md border-[1px] border-theme-light-text-primary bg-transparent px-4 py-2 text-xs hover:cursor-pointer hover:border-theme-light-main hover:text-theme-light-main dark:border-theme-dark-text-primary dark:hover:border-theme-dark-main dark:hover:text-theme-dark-main"
    >
      {children}
    </select>
  );
}

Selector.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
