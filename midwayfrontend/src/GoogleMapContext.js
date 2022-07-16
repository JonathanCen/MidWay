import React, { createContext, useState } from "react";

const GoogleMapContext = createContext();

const GoogleMapProvider = ({ children }) => {
  // Initialize a map state
  const [mapInstance, setMapInstance] = useState(null);
  const [mapMarkerInfoWindow, setMapMarkerInfoWindow] = useState(null);
  const [mapMarkerInformation, setMapMarkerInformation] = useState(null);
  const [businessNameToMarker, setBusinessNameToMarker] = useState({});

  // Zoom into the map

  return (
    <GoogleMapContext.Provider
      value={{
        mapInstance,
        mapMarkerInfoWindow,
        mapMarkerInformation,
        businessNameToMarker,
        setMapInstance,
        setMapMarkerInfoWindow,
        setMapMarkerInformation,
        setBusinessNameToMarker,
      }}
    >
      {children}
    </GoogleMapContext.Provider>
  );
};

export { GoogleMapContext, GoogleMapProvider };
