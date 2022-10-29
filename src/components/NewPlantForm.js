import React, { useContext } from "react";
import { PlantContext } from "./context/plants";

function NewPlantForm() {
  const { handleOnSubmit, handleOnChange, name, image, price } =
    useContext(PlantContext);
  return (
    <div className="new-plant-form">
      <h2> New Plant </h2>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={handleOnChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={handleOnChange}
        />
        <button type="submit"> Add Plant </button>
      </form>
    </div>
  );
}

export default NewPlantForm;
