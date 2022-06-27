const express = require('express');
const router = express.Router();
const validateURL = require('./middleware/validateURL');
const setResponseHeaders = require('./middleware/setResponseHeaders');

// define the  
router.get('/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation', validateURL, setResponseHeaders, (req, res) => {
  // console.log(req);
});

router.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

module.exports = router;