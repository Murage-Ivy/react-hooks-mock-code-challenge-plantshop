import React, { useContext } from "react";
import { PlantContext } from "./context/plants";
import PlantCard from "./PlantCard";

function PlantList() {
  const { data, status, error } = useContext(PlantContext);

  // If an error is encountered 
  if (status === "rejected") {
    return (
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    );
  }

  if (status === "idle") {
    return <h2>Loading...</h2>;
  }

  const plantList = data.map((plant) => (
    <PlantCard
      key={plant.id}
      plantName={plant.name}
      plantImage={plant.image}
      plantPrice={plant.price}
    />
  ));
  return <ul className="cards">{plantList} </ul>;
}

export default PlantList;
