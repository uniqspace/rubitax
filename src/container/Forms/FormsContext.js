import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const FormsContextProvider = ({children}) => {
  const [data, setData] = useState({
    address: '',
    email: '',
    fieldFirst: null,
    fieldFourth: null,
    fieldSecond: null,
    fieldThird: null,
    idScreen: [],
    name: '',
    radioFirst: '',
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

export const useFormsContext = () => useContext(DataContext);