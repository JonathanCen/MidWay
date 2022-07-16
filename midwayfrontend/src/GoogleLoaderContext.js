import React, { createContext, useState } from "react";

const GoogleLoaderContext = createContext();

const GoogleLoaderProvider = ({ children }) => {
  const [googleLoader, setGoogleLoader] = useState(null);

  // Zoom into the map

  return (
    <GoogleLoaderContext.Provider
      value={{
        googleLoader,
        setGoogleLoader,
      }}
    >
      {children}
    </GoogleLoaderContext.Provider>
  );
};

export { GoogleLoaderContext, GoogleLoaderProvider };
