const express = require('express');
const router = express.Router();
const validateURL = require('./middleware/validateURL');
const setResponseHeaders = require('./middleware/setResponseHeaders');

// define the  
router.get('/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation', setResponseHeaders, validateURL,  (req, res) => {
  // console.log(req);
  res.status(200);
  res.json({message: 'Valid request!', requestBody: req.params});
});

router.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

module.exports = router;