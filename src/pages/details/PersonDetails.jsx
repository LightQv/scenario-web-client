import PersonBanner from "./components/person/PersonBanner";
import PersonHeader from "./components/person/PersonHeader";
import PersonList from "./components/person/PersonList";
import PropTypes from "prop-types";

export default function PersonDetails({ data }) {
  return (
    <div className="w-full lg:mx-auto lg:flex lg:w-3/5 lg:flex-col lg:pt-6">
      <PersonBanner src={data.profile_path} alt={data.name} />
      <PersonHeader
        src={data.profile_path}
        alt={data.name}
        name={data.name}
        job={data.known_for_department}
        bio={data.biography}
      />
      <PersonList />
    </div>
  );
}

PersonDetails.propTypes = {
  data: PropTypes.shape().isRequired,
};
