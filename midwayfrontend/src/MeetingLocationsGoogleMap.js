import React, { useRef, useEffect, useContext } from 'react';
import { GoogleMapContext } from "./GoogleMapContext";

/*
 * Title format:
 * 1. Business name
 * 2. Address
 * 3. Google maps direction
 * 4. Yelp url
 */

// ! Based on the name of the business, but if the business is a chain then it might not capture the correct position
const constructGoogleMapsURL = (name, location) => {
  const { latitude, longitude } = location;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}+${name}`;
}

const isValidAddress = (address) => {
  return address !== "" && address !== undefined && address !== null
}

const getAddress = (location) => {
  const address = `${location.address1}${isValidAddress(location.address2) ? " " + location.address2 : ""}${isValidAddress(location.address3) ? " " + location.address3 : ""}`;
  return `${address} ${location.city}, ${location.state}`;
}

const constructMarkerTitle = (name, location, url) => {
  const googleMapsURL = constructGoogleMapsURL(name, location);
  const address = getAddress(location);
  return `<div class="marker-title-name">${name}</div><div class="marker-address">${address}</div><div class="marker-links-container"><a href="${googleMapsURL}" class="marker-links">View on Google Maps</a><a href="${url}" class="marker-links">View on Yelp</a></div>`;
}

const createMarkerCollectionOfBusinessesHelper = (business) => {
  const collection = [];
  for (let { coordinates, location, name, url } of business) {
    const title = constructMarkerTitle(name, location, url);
    const position = {lat: coordinates.latitude, lng: coordinates.longitude};
    collection.push([position, null, title, name]);
  }
  return collection;
}

const createMarkerCollectionOfBusinesses = (businesses, nearbyCitiesAndBusinesses) => {
  // collection entry [position, label, title]
  // Unpack businesses
  const business = businesses.data.search.business;
  let collection = createMarkerCollectionOfBusinessesHelper(business);

  // Unpack nearbyCitiesAndBusinesses if it's not undefined
  if (nearbyCitiesAndBusinesses !== undefined) {
    for (let { businesses } of nearbyCitiesAndBusinesses) {
      collection = collection.concat(createMarkerCollectionOfBusinessesHelper(businesses));
    }
  }

  return collection;
}

/*
 * Create a center button on the map that allows user to the recenter the map after clicking onto a marker
 * Taken from: Google documentation.
 */
const createCenterControl = (centerControlContainer, map, bounds) => {

  // Add some style with the center box
  const centerControlBox = document.createElement("div");
  centerControlBox.style.backgroundColor = "#fff";
  centerControlBox.style.border = "2px solid #fff";
  centerControlBox.style.borderRadius = "3px";
  centerControlBox.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  centerControlBox.style.cursor = "pointer";
  centerControlBox.style.marginTop = "8px";
  centerControlBox.style.marginBottom = "22px";
  centerControlBox.style.textAlign = "center";
  centerControlBox.title = "Click to recenter the map";
  centerControlContainer.appendChild(centerControlBox);

  // Add some style to the text
  const centerControlText = document.createElement("div");
  centerControlText.style.color = "rgb(25,25,25)";
  centerControlText.style.fontFamily = "Roboto,sans-serif";
  centerControlText.style.fontSize = "16px";
  centerControlText.style.lineHeight = "38px";
  centerControlText.style.paddingLeft = "5px";
  centerControlText.style.paddingRight = "5px";
  centerControlText.innerHTML = "Center Map";
  centerControlBox.appendChild(centerControlText);

  // Add event handler to the div that recenters the map to the bounds
  centerControlBox.addEventListener("click", () => {
    map.fitBounds(bounds);
  });

}

const MeetingLocationsGoogleMapWrapper = ({ style, meetingLocationsData }) => {
  const { setMapInstance, setMapMarkerInfoWindow, setMapMarkerInformation, setBusinessNameToMarker } = useContext(GoogleMapContext);
  const ref = useRef(null);

  const { midPointGeographicCoordinate, businesses, nearbyCitiesAndBusinesses, requestBody } = meetingLocationsData;

  useEffect(() => {
    // Create the map
    const map = new window.google.maps.Map(ref.current, {
      center: midPointGeographicCoordinate,
      gestureHandling: "greedy",
      zoom: 15,
      streetViewControl: false,
    });
    
    // Create a shared info window for all markers
    const markerInfoWindow = new window.google.maps.InfoWindow();

    // Create a collection for the first and second address marker
    const markerInformation = [
      [requestBody.addressesOfGeographicCoordinates[0], 'Adr1', `<div class="marker-title-name">Address 1:</div> ${requestBody.firstAddress}`, undefined],
      [midPointGeographicCoordinate, "MP", "Calculated Midpoint", undefined],
      [requestBody.addressesOfGeographicCoordinates[1], 'Adr2', `<div class="marker-title-name">Address 2:</div> ${requestBody.secondAddress}`, undefined],
      ...createMarkerCollectionOfBusinesses(businesses, nearbyCitiesAndBusinesses)
    ];

    // Sets bounds for the map so that the map will show all the points in the collection
    let bounds = new window.google.maps.LatLngBounds();

    // const pinImageURL = "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg";
    const businessNameToMarkerInstance = {};

    // Iterate through all the addresses and mark a marker for them on the map
    markerInformation.forEach(([position, label, title, businessName], i) => {
      // Creates a marker on the map
      const marker = new window.google.maps.Marker({
        position,
        map, 
        title,
        label: {
          text: label === null ? `${i-2}`: label,
          className: "marker-label"
        }
      });

      // Store the marker instance to the name of the business if it's not the starting locations or mid point
      if (businessName !== undefined) {
        businessNameToMarkerInstance[businessName] = marker;
      }

      // Stores the position of the marker 
      bounds.extend(marker.getPosition());

      // Allows the marker to display an infoWindow
      marker.addListener("click", () => {
        // When initally pressed close the info window
        const infoWindowPreviousContent = markerInfoWindow.getContent();
        markerInfoWindow.setContent(undefined);
        markerInfoWindow.close();

        // If the previous content is not the same as the current marker content, then display it
        if (infoWindowPreviousContent !== marker.getTitle()) {
          // Position the map such that the center is the selected marker
          map.panTo(marker.getPosition());
          map.setZoom(14);

          // Open the info window
          markerInfoWindow.setContent(marker.getTitle());
          markerInfoWindow.open(marker.getMap(), marker);
        }
      });

      markerInfoWindow.addListener('closeclick', () => {
        // Close the info window and reset the content within the window
        markerInfoWindow.setContent(undefined);
        markerInfoWindow.close();
      }); 

    });

    // Fits the map to the points on the map
    map.fitBounds(bounds);

    // Add a button to the map that recenters the map
    const centerControlDiv = document.createElement("div");
    createCenterControl(centerControlDiv, map, bounds);
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    // Store the state of all the map information
    setMapInstance(map);
    setMapMarkerInfoWindow(markerInfoWindow);
    setMapMarkerInformation(markerInformation);
    setBusinessNameToMarker(businessNameToMarkerInstance);

  }, []);

  return (
      <div ref={ref} style={style}>
      </div>
  );
};

export default MeetingLocationsGoogleMapWrapper;