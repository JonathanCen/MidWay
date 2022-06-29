const express = require('express');
const router = express.Router();
const { calculateMidPoint, fetchBusinesses, fetchNearbyCities } = require('./utils');
const validateParams = require('./middleware/validateParams');
const validateTransportationFeasibility = require('./middleware/validateTransportationFeasibility');
const setResponseHeaders = require('./middleware/setResponseHeaders');

// define the  
router.get('/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation', setResponseHeaders, validateParams, validateTransportationFeasibility, async (req, res) => {
  const { firstAddress, secondAddress, activity, transportation } = req.params;
  const maxNumBusinessesToReturn = 10;
  const googleAPIResponse = res.locals.directionsResponseData;
  const responseBody = {message: 'Valid request!', requestBody: req.params};

  // Calculate midpoint from the two locations w/ Google API
  // ! Problem is this is computed based on the directions from the firstAddress to secondAddress, can fix is s.t. we are taking both addresses into account
  const midPointGeographicCoordinate = calculateMidPoint(googleAPIResponse);
  responseBody["midPointGeographicCoordinate"] = midPointGeographicCoordinate;

  try {
    // Find places based on their activity w/ Yelp API
    const businessResponse = await fetchBusinesses(activity, midPointGeographicCoordinate);
    const businessData = businessResponse.data;
    responseBody["businesses"] = businessData;
    
    // If there are no results based on the midpoint, then find the nearest city and search for businesses within that city
    if (businessData.data.search.business.length < maxNumBusinessesToReturn) {
      const nearbyCitiesResponse = await fetchNearbyCities(midPointGeographicCoordinate);
      const nearbyCitiesData = nearbyCitiesResponse.data.data;

      // Initialize default response
      responseBody["nearbyCitiesAndBusinesses"] = [];

      // Iterate through all the cities until we have at least maxNumBusinessesToReturn (10) results
      let citiesIndex = 0, numBusinessesLeft = maxNumBusinessesToReturn - businessData.data.search.business.length;
      while (citiesIndex < nearbyCitiesData.length && numBusinessesLeft > 0) {
        // Initialize local constants
        const cityGeographicCoordinates = {lat: nearbyCitiesData[citiesIndex].latitude, lng: nearbyCitiesData[citiesIndex].longitude};
        const cityBusinessesResponse = await fetchBusinesses(activity, cityGeographicCoordinates, numBusinessesLeft);
        const cityBusinessesData = cityBusinessesResponse.data;
  
        // Check if there are any results in this city that matches the selected activity
        if (cityBusinessesData.data.search.business.length > 0) {
          const newCity = {
            ...nearbyCitiesData[citiesIndex],
            businesses: [...cityBusinessesData.data.search.business]
          }
          responseBody["nearbyCitiesAndBusinesses"].push(newCity);
          numBusinessesLeft -= cityBusinessesData.data.search.business.length;
        }
        
        // Increment the city index
        citiesIndex += 1;
      }
    }
    // Send results back to user
    res.status(200);
    res.json(responseBody);
  } catch (err) {
    console.log(`ERROR : ${err}.`);
    res.status(400);
    res.json(`Sever Error: ${err}`);
  } 
});

router.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

module.exports = router;