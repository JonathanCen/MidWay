const axios = require('axios');
const util = require('@googlemaps/google-maps-services-js/dist/util');

/*
 * Makes a request to Google Geocoding API to see if the address exists and returns a promise to the caller
 TODO: Need to parse the address because axios does not take specail characters!
 */
const fetchGeocoding = (address) => {
  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  return axios.get(geocodeURL);
}

/*
 * Calculates an estimated midpoint geographic coordinates between the two addresses
 */
const calculateMidPoint = (googleAPIResponse) => {
  // Unwrapping the api's response
  const routeLegs = googleAPIResponse.routes[0].legs[0];

  // Retrieve the total trip duration & est. midway of the travel duration & extracted steps to get there
  const totalTravelDuration = routeLegs.duration.value;
  const estimatedMidPointTravelDuration = Math.floor(totalTravelDuration/2);
  const steps = routeLegs.steps;

  // Indices for steps and duration counter
  let currentDuration = 0, stepIndex = 0;

  // Iterate the steps until we hit the step right before the midpoint
  while (currentDuration + steps[stepIndex].duration.value < estimatedMidPointTravelDuration) {
    currentDuration += steps[stepIndex].duration.value;
    stepIndex += 1;
  }

  // Retrieve all the longitude and latitude points for that step
  const startingLocation = steps[stepIndex].start_location, endingLocation = steps[stepIndex].end_location;
  const geographicPathCoordinates = [startingLocation].concat(util.decodePath(steps[stepIndex].polyline.points), [endingLocation]);

  // Calculate the rate of duration/point and the left over duration from the midpoint
  const durationForEachCoordinate = steps[stepIndex].duration.value / geographicPathCoordinates.length;
  const leftOverDuration = estimatedMidPointTravelDuration - currentDuration;

  // Compute the midpoint coordinate index
  const midPointCoordinateIndex = leftOverDuration > 0 ? Math.floor(leftOverDuration/durationForEachCoordinate)-1 : 0;

  // Compute the midpoint
  const midPointCoordinate = {
    lat: (geographicPathCoordinates[midPointCoordinateIndex].lat + geographicPathCoordinates[midPointCoordinateIndex+1].lat)/2,
    lng: (geographicPathCoordinates[midPointCoordinateIndex].lng + geographicPathCoordinates[midPointCoordinateIndex+1].lng)/2
  }

  return midPointCoordinate;
}


/*
 * Fetches locations near the geographic coordinates 
 */
const fetchBusinesses = (activity, geographicCoordinates, offset = 5) => {
  // Configurations for Yelp graphQL request
  const yelpApiUrl = 'https://api.yelp.com/v3/graphql';
  const config = {
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
  };
  const {lat, lng} = geographicCoordinates, searchRadius = 40000;

  // graphQL query based on the provided inputa
  const graphQLQuery = `
      query {
        search(term: "${activity}",
                latitude: ${lat},
                longitude: ${lng}
                limit: ${offset}) {
            business {
                name
                display_phone
                review_count
                rating
                price
                location {
                  address1
                  address2
                  address3
                  city
                  state
                  postal_code
                  country
                }
                coordinates {
                  latitude
                  longitude
                }
                photos
                hours {
                  open {
                    end
                    start
                    day
                  }
                  is_open_now
                }
                reviews {
                  text
                  rating
                }
                categories {
                    title
                }
                url
            }
        }
      }
  `; 

  // Sending a request to Yelp graphQL
  return axios.post(yelpApiUrl, { query: graphQLQuery }, config);
    // .then(res => console.log(`Fetch businesses: ${res}`))
    // .catch(err => console.log(`Error: ${err}`));
}


/*
 * Fetches near by cities based on the geographic coordinates
 */
const fetchNearbyCities = (geographicCoordinates) => {
  // Extract geographic coordinates
  const { lat, lng } = geographicCoordinates;

  // Axios URL & options
  const apiURL = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${lng}/nearbyCities`,
    params = { 
      radius: '100' 
    },
    headers = {
      'X-RapidAPI-Key': process.env.GEODB_API_KEY,
      'X-RapidAPI-Host': process.env.GEODO_API_HOST
    };
  
  return axios.get(apiURL, {
    params: params,
    headers: headers
  });
}

const createSetOfSeenBusinesses = (businessData) => {
  const seenBusinesses = new Set();
  for (let {coordinates} of businessData.data.search.business) {
    const stringCoords = `${coordinates.latitude}${coordinates.longitude}`;
    seenBusinesses.add(stringCoords);
  }
  return seenBusinesses;
}

/*
 * Iterates through an array of nearby cities and fetches businesses within those cities 
 */
const findBusinessesFromNearbyCities = async (activity, nearbyCitiesData, maxNumBusinessesToReturn, numBusinessesLeft, seenBusinesses) => {
  try {
    // Return an array of objects (cities) 
    let nearbyCitiesAndBusinesses = [], citiesIndex = 0;
  
    // Iterate through all the cities until we have at least maxNumBusinessesToReturn (10) results
    while (citiesIndex < nearbyCitiesData.length && numBusinessesLeft > 0) {
      // Initialize local constants
      const numBusinessesToFetch = (maxNumBusinessesToReturn - numBusinessesLeft) * 2;
      const cityGeographicCoordinates = {lat: nearbyCitiesData[citiesIndex].latitude, lng: nearbyCitiesData[citiesIndex].longitude};
      const cityBusinessesResponse = await fetchBusinesses(activity, cityGeographicCoordinates, numBusinessesToFetch);
      const cityBusinessesData = cityBusinessesResponse.data;
  
      // Iterate through all businesses found and store them in the array
      const businesses = [];
      for (let business of cityBusinessesData.data.search.business) {
        // Check if we reached the search limit
        if (numBusinessesLeft === 0) {
          break;
        }

        // Check if we seen this business before
        const businessCoordinate = `${business.coordinates.latitude}${business.coordinates.longitude}`;
        if (!seenBusinesses.has(businessCoordinate)) {
          businesses.push({ ...business });
          seenBusinesses.add(businessCoordinate);
          numBusinessesLeft -= 1;
        }
      }

      if (businesses.length > 0) {
        const newCity = {
          ...nearbyCitiesData[citiesIndex],
          "businesses": businesses
        }
        nearbyCitiesAndBusinesses.push(newCity);
      }
      
      // Increment the city index
      citiesIndex += 1;
    }

    return nearbyCitiesAndBusinesses;
  } catch (err) {
    console.log(`Error: ${err}`);
    return [];
  }
}


module.exports = { fetchGeocoding, calculateMidPoint, fetchBusinesses, fetchNearbyCities , createSetOfSeenBusinesses, findBusinessesFromNearbyCities }