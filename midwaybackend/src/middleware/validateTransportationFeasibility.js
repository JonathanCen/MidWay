const { Client } = require('@googlemaps/google-maps-services-js');
const util = require('@googlemaps/google-maps-services-js/dist/util');

/*
 * Determines whether its possible to find a midpoint using the set transportation method
 * Calls the Google Maps direction API to check if there is a valid direction
 */
const validateTransportationFeasibility = async (req, res, next) => {
  try {
    // Create a client with default settings and extract information from params
    const { firstAddress, secondAddress, transportation } = req.params;
    const client = new Client();
    
    // Configurations for direction API
    const config = {
      params: {
        origin: firstAddress,
        destination: secondAddress,
        mode: transportation,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    };

    // Perform the API call
    const response = await client.directions(config);
    const responseData = response.data;
    
    // Check whether there is a valid mode a transportation from the given locations
    if (responseData.status === 'ZERO_RESULTS') {
      res.status(200);
      res.json({message: `There are no possible paths and midpoint for ${firstAddress} and ${secondAddress} with ${transportation} mode of transportation. `});
    }

    // Pass the fetched data to the next middleware
    res.locals.directionsResponseData = responseData;

    // Pass the results to the next middleware
    next();
  } catch (err) {
    // If there is any error in the server
    const errorMessage = `There is a server error at middleware validateTransportationFeasibility. Error: ${err}`;
    res.status(400);
    res.json({message: errorMessage});
    return;
  }
}

module.exports = validateTransportationFeasibility;

