const express = require('express');
const router = express.Router();
const validateURL = require('./middleware/validateURL');
const setResponseHeaders = require('./middleware/setResponseHeaders');

// define the  
router.get('/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation', setResponseHeaders, validateURL,  (req, res) => {
  // Calculate midpoint from the two locations w/ Google API
  

  // Find places based on their activity w/ Yelp API


  // Send results back to user
  res.status(200);
  res.json({message: 'Valid request!', requestBody: req.params});
});

router.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

module.exports = router;