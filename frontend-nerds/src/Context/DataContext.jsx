/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
    const [user, setUser] = useState(null);

  return (
    <DataContext.Provider
      value={{ data, setData, selectedExpert, setSelectedExpert, user, setUser }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
