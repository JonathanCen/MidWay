import React, { useState, useRef, useEffect } from 'react';

const MeetingLocationsGoogleMapWrapper = ({ style }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: {lat: 0, lng: 0},
        zoom: 8,
        streetViewControl: false,
      }));
    }
  }, [ref, map]);

  return (
      <div ref={ref} style={style} />
  );
};

export default MeetingLocationsGoogleMapWrapper;