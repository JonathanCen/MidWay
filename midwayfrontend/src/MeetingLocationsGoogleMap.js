import React, { useState, useRef, useEffect } from 'react';


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
    collection.push([position, null, title]);
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

const MeetingLocationsGoogleMapWrapper = ({ style, meetingLocationsData }) => {
  const ref = useRef(null);
  // const [map, setMap] = useState();

  const { midPointGeographicCoordinate, businesses, nearbyCitiesAndBusinesses, requestBody } = meetingLocationsData;

  useEffect(() => {
    // Create the map
    const map = new window.google.maps.Map(ref.current, {
      center: midPointGeographicCoordinate,
      zoom: 15,
      streetViewControl: false,
    });
    
    // Create a shared info window for all markers
    const markerInfoWindow = new window.google.maps.InfoWindow();

    // Create a collection for the first and second address marker
    const addressCollection = [
      [requestBody.addressesOfGeographicCoordinates[0], 'Adr1', `<b>Address 1</b>: ${requestBody.firstAddress}`],
      [midPointGeographicCoordinate, "MP", "Calculated Midpoint"],
      [requestBody.addressesOfGeographicCoordinates[1], 'Adr2', `<b>Address 2</b>: ${requestBody.secondAddress}`],
      ...createMarkerCollectionOfBusinesses(businesses, nearbyCitiesAndBusinesses)
    ];

    console.log(addressCollection);

    // Sets bounds for the map so that the map will show all the points in the collection
    let bounds = new window.google.maps.LatLngBounds();

    const pinImageURL = "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg";

    // Iterate through all the addresses and mark a marker for them on the map
    addressCollection.forEach(([position, label, title], i) => {
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

      // Stores the position of the marker 
      bounds.extend(marker.getPosition());

      // Allows the marker to display an infoWindow
      marker.addListener("click", (e) => {
        // When initally pressed close the info window
        const infoWindowPreviousContent = markerInfoWindow.getContent();
        markerInfoWindow.setContent(undefined);
        markerInfoWindow.close();

        // If the previous content is not the same as the current marker content, then display it
        if (infoWindowPreviousContent !== marker.getTitle()) {
          // Position the map such that the center is the selected marker
          // map.setCenter(marker.getPosition());
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

    // // Create a content string for the midpoint marker
    // const contentString = `<h2>Calculated Midpoint</h2>`;

    // const infoMidPointWindow = new window.google.maps.InfoWindow({
    //   content: contentString,
    // });

    // // Mark the calculated midpoint
    // const midPointMarker = new window.google.maps.Marker({
    //   position: midPointGeographicCoordinate,
    //   map,
    //   label: {
    //     text: "MP",
    //     className: "marker-label"
    //   },
    //   title: "Calculated MidPoint",
    // });

    // const markerToggle = {"Midpoint": false}

    // midPointMarker.addListener("click", () => {
    //   if (!markerToggle["Midpoint"]) {
    //     infoMidPointWindow.open({
    //       anchor: midPointMarker,
    //       map,
    //       shouldFocus: false,
    //     }); 
    //     markerToggle["Midpoint"] = true;
    //   } else {
    //     infoMidPointWindow.close();
    //     markerToggle["Midpoint"] = false;
    //   }
    // });

    // infoMidPointWindow.addListener('closeclick', ()=>{
    //   markerToggle["Midpoint"] = false;
    // }); 

  }, []);

  return (
      <div ref={ref} style={style} >
        <div id="map-center-control">
          <div id="map-center-text" >
            Recenter map
          </div>
        </div>
      </div>
  );
};

export default MeetingLocationsGoogleMapWrapper;