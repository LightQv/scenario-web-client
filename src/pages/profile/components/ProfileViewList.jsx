import { useEffect, useState } from "react";
import DropdownSvg from "../../../components/svg/action/dropdown/DropdownSvg";
import DropupSvg from "../../../components/svg/action/dropdown/DropupSvg";
import PropTypes from "prop-types";
import MediaCard from "../../../components/MediaCard";
import Selector from "../../../components/Selector";
import { useTranslation } from "react-i18next";

export default function ProfileViewList({ title, data, genre }) {
  const [showList, setShowList] = useState(false);
  const [filter, setFiler] = useState("0");
  const [filteredList, setFilteredList] = useState([]);
  const { t } = useTranslation();
  console.log(data);
  //--- Determine which type of Result and return Genre name based on ID ---//
  useEffect(() => {
    setFilteredList(
      data?.filter((el) => {
        return el.genre_ids.includes(Number(filter));
      })
    );
  }, [data, filter]);

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
      {showList && (
        <>
          <div className="mx-auto my-2 flex w-fit items-center justify-center gap-2 lg:ml-auto lg:mr-5">
            <h1 className="text-xs">{t("filter.title")}</h1>
            <Selector
              defaultValue={filter}
              onChange={(e) => setFiler(e.target.value)}
            >
              <option value={"0"}>{t("filter.every")}</option>
              {genre.map((genre, index) => (
                <option key={index} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Selector>
          </div>
          {filteredList?.length > 0 ? (
            <ul className="grid grid-flow-row px-5 pb-2 lg:grid-cols-2 lg:px-0">
              {filteredList
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((el) => (
                  <MediaCard data={el} key={el.id} />
                ))}
            </ul>
          ) : (
            <p className="mb-4 text-center text-sm italic lg:text-base">
              {t("error.noContent")}
            </p>
          )}
        </>
      )}
    </section>
  );
}

ProfileViewList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  genre: PropTypes.arrayOf(PropTypes.shape()),
};
