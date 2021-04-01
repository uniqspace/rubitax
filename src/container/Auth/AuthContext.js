import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <DataContext.Provider value= {{ data, setValues }}>
        {children}
    </DataContext.Provider>
  );
};

export const useAuthContext = () => useContext(DataContext);