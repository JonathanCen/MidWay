const axios = require('axios');

/*
 * Makes a request to Google Geocoding API to see if the address exists and returns a promise to the caller
 */
const fetchGeocoding = (address) => {
  try {
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    return axios.get(geocodeURL);
  } catch (err) {
    console.log(`Error in fetchGeocoding: ${err}`);
  }
}


const calculateMidWay = (addressOne, addressTwo) => {

}



const fetchLocations = (address) => {
  
}


module.exports = { fetchGeocoding }