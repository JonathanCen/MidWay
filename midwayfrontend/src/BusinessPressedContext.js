import React, { useState, createContext } from "react";

const BusinessPressedContext = createContext();

const BusinessPressedProvider = ({ children }) => {
  // Initialize business states
  const [isBusinessPressed, setIsBusinessPressed] = useState(false);
  const [businessInformation, setBusinessInformation] = useState({});


  return (
    <BusinessPressedContext.Provider
      value={{
        isBusinessPressed,
        businessInformation,
        setIsBusinessPressed,
        setBusinessInformation
      }}>
        {children}
    </BusinessPressedContext.Provider>
  )
}

export { BusinessPressedContext, BusinessPressedProvider };