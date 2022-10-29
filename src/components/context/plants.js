import React from "react";
import { createContext, useEffect, useReducer } from "react";

const PlantContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "startFetch":
      return {
        data: null,
        status: "idle",
        error: null,
      };

    case "resolvedFetch":
      return {
        data: action.payload,
        status: "resolved",
        error: null,
      };

    case "rejectedFetch":
      return {
        data: null,
        state: "rejected",
        error: action.payload,
      };

    default:
      return state;
  }
}

function postPlantReducer(state, action) {
  switch (action.type) {
    case "inputField":
      return {
        ...state,
        [action.name]: action.value,
      };

    case "error":
      return {
        ...state,
        error: action.payload,
      };

    case "submitted":
      return {
        name: "",
        image: "",
        price: "",
      };

    default:
      return state;
  }
}

function PlantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    status: "idle",
    error: null,
  });

  const [postState, postDispatch] = useReducer(postPlantReducer, {
    name: "",
    image: "",
    price: 0,
    loading: false,
    error: null,
  });

  const { data, status, error } = state;
  const { name, image, price, loading } = postState;

  useEffect(() => {
    dispatch({ type: "startFetch" });
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((plants) => {
        dispatch({ type: "resolvedFetch", payload: plants });
      })
      .catch((error) => dispatch({ type: "rejectedFetch", payload: error }));
  }, []);

  // Controls the form
  function handleOnChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    postDispatch({ type: "inputField", name: name, value: value });
  }

  // Adds a new plant
  function handleOnSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        image: image,
        price: parseInt(price),
      }),
    })
      .then((res) => res.json())
      .then((plant) => {
        postDispatch({ type: "submitted" });
        dispatch({ type: "resolved", payload: { ...plant } });
      })
      .catch((error) => postDispatch({ type: "error", payload: error }));
    console.log("This plant has been submitted.");
  }

  const value = {
    data,
    status,
    error,
    name,
    image,
    price,
    loading,
    dispatch,
    handleOnSubmit,
    handleOnChange,
  };

  return (
    <PlantContext.Provider value={value}>{children}</PlantContext.Provider>
  );
}

export { PlantContext, PlantProvider };
