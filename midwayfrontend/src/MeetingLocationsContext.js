import React, { createContext, useState } from "react";

const MeetingLocationsContext = createContext();

const MeetingLocationsProvider = ({ children }) => {
  // Initialize a map state
  const [locationPathName, setLocationPathName] = useState("");

  // Zoom into the map

  return (
    <MeetingLocationsContext.Provider
      value={{
        locationPathName,
        setLocationPathName,
      }}
    >
      {children}
    </MeetingLocationsContext.Provider>
  );
};

export { MeetingLocationsContext, MeetingLocationsProvider };
