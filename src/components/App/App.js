import "./App.css";
import { useState, useEffect } from "react";
import SightingsContainer from "../SightingsContainer/SightingsContainer";
import Form from "../Form/Form";

const App = () => {
  const dummyData = [
    {
      id: 1,
      location: "Denver, CO",
      description: "Bright lights over Cheesman Park",
    },
    {
      id: 2,
      location: "Chicago, IL",
      description:
        "Silver shape hovering low over the Chicago River, darted away with no sound",
    },
    {
      id: 3,
      location: "Louisville, KY",
      description:
        "Bright light and humming noise accompanied by high atmospheric pressure, localized over one house",
    },
  ];

  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState("");

  const addSighting = (newSighting) => {
    postSighting(newSighting)
    .then(data => 
    setSightings([...sightings, data]));
  };

  const getAllSightings = () => {
    return fetch("http://localhost:3001/sightings/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setSightings([...sightings, ...data])})
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    getAllSightings();
  }, []);

  const postSighting = (newSighting) => {
    return fetch("http://localhost:3001/sightings/", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSighting),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      console.log(response);
      return response.json();
      })
      .catch((error) => setError(error.message));
    }
  
  const deleteSighting = (id) => {
    console.log("id:=====", id);
    const filteredSighting = sightings.filter((sighting) => sighting.id !== id);
    setSightings(filteredSighting);
  };
  return (
    <main className='App'>
      <h1>UFO Sightings IdeaBox</h1>
      {!sightings.length && <h2>There are no sightings yet, add some!</h2>}
      <Form addSighting={addSighting} />
      <SightingsContainer
        allSightings={sightings}
        deleteSighting={deleteSighting}
      />
      {error && <p className='error-message'>{error}</p>}
    </main>
  );
};

export default App;
