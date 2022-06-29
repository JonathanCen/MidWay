const express = require('express');
const router = express.Router();
const { calculateMidPoint, fetchLocations, fetchNearbyCities } = require('./utils');
const validateParams = require('./middleware/validateParams');
const validateTransportationFeasibility = require('./middleware/validateTransportationFeasibility');
const setResponseHeaders = require('./middleware/setResponseHeaders');

// define the  
router.get('/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation', setResponseHeaders, validateParams, validateTransportationFeasibility, (req, res) => {
  const { firstAddress, secondAddress, activity, transportation } = req.params;
  const googleAPIResponse = res.locals.directionsResponseData;

  // Calculate midpoint from the two locations w/ Google API
  // ! Problem is this is computed based on the directions from the firstAddress to secondAddress, can fix is s.t. we are taking both addresses into account
  const midPointGeographicCoordinate = calculateMidPoint(googleAPIResponse);

  // Find places based on their activity w/ Yelp API

  // If there are no results based on the midpoint, then find the nearest city 


  // Send results back to user
  res.status(200);
  res.json({message: 'Valid request!', requestBody: req.params, googleAPIResponse: googleAPIResponse, midPointGeographicCoordinate: midPointGeographicCoordinate});
});

router.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

module.exports = router;