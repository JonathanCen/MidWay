const express = require('express');
const router = express.Router();
const { calculateMidPoint, fetchBusinesses, fetchNearbyCities, createSetOfSeenBusinesses, findBusinessesFromNearbyCities } = require('./utils');
const validateParams = require('./middleware/validateParams');
const validateTransportationFeasibility = require('./middleware/validateTransportationFeasibility');
const setResponseHeaders = require('./middleware/setResponseHeaders');

// define the  
router.get('/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation', setResponseHeaders, validateParams, validateTransportationFeasibility, async (req, res) => {
  const { activity } = req.params;
  const maxNumBusinessesToReturn = 10;
  const googleAPIResponse = res.locals.directionsResponseData;
  const responseBody = {message: 'Valid request!', requestBody: req.params};

  // Calculate midpoint from the two locations w/ Google API
  // ! Problem is this is computed based on the directions from the firstAddress to secondAddress, can fix is s.t. we are taking both addresses into account
  const midPointGeographicCoordinate = calculateMidPoint(googleAPIResponse);
  responseBody["midPointGeographicCoordinate"] = midPointGeographicCoordinate;

  try {
    // Find places based on their activity w/ Yelp API
    // ! Change the 5 back to maxNumBusinessesToReturn
    const businessResponse = await fetchBusinesses(activity, midPointGeographicCoordinate, 5);
    const businessData = businessResponse.data;
    responseBody["businesses"] = businessData;

    const seenBusinesses = createSetOfSeenBusinesses(businessData);
    
    // If there are no results based on the midpoint, then find the nearest city and search for businesses within that city
    if (businessData.data.search.business.length < maxNumBusinessesToReturn) {
      // Fetch nearby cities from the midpoint
      const nearbyCitiesResponse = await fetchNearbyCities(midPointGeographicCoordinate);
      const nearbyCitiesData = nearbyCitiesResponse.data.data;

      // Fetch businesses from nearby cities
      const numBusinessesLeft = maxNumBusinessesToReturn - businessData.data.search.business.length;
      responseBody["nearbyCitiesAndBusinesses"] = await findBusinessesFromNearbyCities(activity, nearbyCitiesData, maxNumBusinessesToReturn, numBusinessesLeft, seenBusinesses);
      console.log(responseBody["nearbyCitiesAndBusinesses"])
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