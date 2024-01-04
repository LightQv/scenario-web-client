import { useTranslation } from "react-i18next";
import { languageList } from "../../../services/lng";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLng = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lng", e.target.value);
  };

  return (
    <select
      defaultValue={localStorage.getItem("lng") || undefined}
      onChange={changeLng}
      className="h-fit w-fit bg-transparent hover:cursor-pointer"
    >
      {languageList.map((lng) => (
        <option value={lng.tag} key={lng.id}>
          {lng.icon} {lng.name}
        </option>
      ))}
    </select>
  );
}
