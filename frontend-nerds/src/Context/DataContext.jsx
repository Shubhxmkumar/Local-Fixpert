import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const DataContext = createContext();

// 2️⃣ Create Provider
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(); // shared state
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// 3️⃣ Create custom hook for easy usage
export const useData = () => useContext(DataContext);
