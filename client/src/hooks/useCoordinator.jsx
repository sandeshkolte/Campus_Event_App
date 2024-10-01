import React, { createContext, useState, useContext } from "react";

// Create the context
const CoordinatorContext = createContext();

// Create a provider component
export const CoordinatorProvider = ({ children }) => {
  const [selectedCoordinators, setSelectedCoordinators] = useState([]);

  const addCoordinator = (coordinator) => {
    setSelectedCoordinators((prev) => [...prev, coordinator]);
  };

  const removeCoordinator = (coordinator) => {
    setSelectedCoordinators((prev) => prev.filter((c) => c !== coordinator));
  };

  return (
    <CoordinatorContext.Provider
      value={{ selectedCoordinators, addCoordinator, removeCoordinator }}
    >
      {children}
    </CoordinatorContext.Provider>
  );
};

// Hook to use the CoordinatorContext
export const useCoordinator = () => {
  return useContext(CoordinatorContext);
};
