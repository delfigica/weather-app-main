"use client";
import React, { createContext, useContext, useState } from "react";

const UnitsContext = createContext(null);

export const UnitsProvider = ({ children }) => {
  const [units, setUnits] = useState({
    temperature: "celsius",
    windSpeed: "km/h",
    precipitation: "millimeters",
  });

  const value = { units, setUnits };

  return (
    <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
  );
};

export const useUnits = () => {
  const ctx = useContext(UnitsContext);
  if (!ctx) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return ctx;
};
