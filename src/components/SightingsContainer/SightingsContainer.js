import "./SightingsContainer.css";
import Card from "../Card/Card";

const SightingsContainer = ({ allSightings, deleteSighting }) => {


  const sightingCards = allSightings.map((allSightings) => {
    const { id, location, description } = allSightings;

    return (
      <Card id={id} location={location} description={description} key={id} deleteSighting={deleteSighting}/>
    );
  });

  return <div className='sightings-container'>{sightingCards}</div>;
};

export default SightingsContainer;
