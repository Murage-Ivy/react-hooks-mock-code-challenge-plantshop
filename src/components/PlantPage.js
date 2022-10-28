import React from "react";
import { PlantProvider } from "./context/plants";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";


function PlantPage() {
  
  return (
    <main>
      <PlantProvider>
        <NewPlantForm />
        <Search />
        <PlantList />
      </PlantProvider>
    </main>
  );
}

export default PlantPage;
