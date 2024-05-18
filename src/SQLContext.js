import React, { createContext, useState } from 'react';

export const SQLContext = createContext();

export const SQLProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  
  return (
    <SQLContext.Provider value={{ tables, setTables }}>
      {children}
    </SQLContext.Provider>
  );
};
