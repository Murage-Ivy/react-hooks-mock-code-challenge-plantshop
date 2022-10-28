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

function PlantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    status: "idle",
    error: null,
  });

  const { data, status, error } = state;

  useEffect(() => {
    dispatch({ type: "startFetch" });
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((plants) => {
        dispatch({ type: "resolvedFetch", payload: plants });
      })
      .catch((error) => dispatch({ type: "rejectedFetch", payload: error }));
  }, []);

  const value = {
    data,
    status,
    error,
    dispatch,
  };

  return (
    <PlantContext.Provider value={value}>{children}</PlantContext.Provider>
  );
}

export { PlantContext, PlantProvider };
