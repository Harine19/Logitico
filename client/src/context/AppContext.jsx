// src/context/AppContext.jsx
import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [userdets, setUser] = useState(null); // Example state

  return (
    <AppContext.Provider value={{ userdets, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
