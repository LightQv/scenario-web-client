import { useState } from "react";
import DropdownSvg from "../../../components/svg/action/dropdown/DropdownSvg";
import DropupSvg from "../../../components/svg/action/dropdown/DropupSvg";
import PropTypes from "prop-types";
import MediaCard from "../../../components/MediaCard";

export default function ProfileViewList({ title, data }) {
  const [showList, setShowList] = useState(false);

  if (!data.length > 0) return null;
  return (
    <section className="relative flex flex-col gap-2 border-b-[1px] border-theme-light-bg-third py-2 lg:mx-5 lg:gap-4 lg:py-4 dark:border-theme-dark-bg-third">
      <button
        type="button"
        onClick={() => setShowList(!showList)}
        className="flex h-fit w-full items-center justify-between px-5 lg:px-0"
      >
        <h1 className="font-abri text-lg lg:text-2xl">{title}</h1>
        {showList ? <DropupSvg /> : <DropdownSvg />}
      </button>
      {showList && data?.length > 0 && (
        <ul className="grid grid-flow-row px-5 pb-2 lg:grid-cols-2 lg:px-0">
          {data
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((el) => (
              <MediaCard data={el} key={el.id} />
            ))}
        </ul>
      )}
    </section>
  );
}

ProfileViewList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
