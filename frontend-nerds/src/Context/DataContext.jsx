import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [data, setData] = useState();
  const [locationforfilter, setlocationforfilter] = useState();
  const [selectedExpert, setSelectedExpert] = useState();
  const [serviceselect, setserviceprovide] = useState();
  const url = "localhost:3000"

  // ✅ Save user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        url,
        data,
        setData,
        selectedExpert,
        setSelectedExpert,
        locationforfilter,
        setlocationforfilter,
        serviceselect,
        setserviceprovide,
        user,
        setUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);