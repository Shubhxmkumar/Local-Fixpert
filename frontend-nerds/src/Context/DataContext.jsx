/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [data, setData] = useState(); // shared state
  const [locationforfilter, setlocationforfilter] = useState();
  const [selectedExpert, setSelectedExpert] = useState();
  const [serviceselect, setserviceprovide] = useState();
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        selectedExpert,
        setSelectedExpert,
        locationforfilter,
        setlocationforfilter,
        serviceselect,
        setserviceprovide,
        user,setUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);