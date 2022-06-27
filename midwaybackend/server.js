const express = require('express');
const app = express();
const setResponseHeaders = require('./src/middleware/validateURL');
const findLocations = require('./src/findLocations');

app.get('/testingAPICall', (req, res) => {
  console.log("getting api");
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.json({ "message": "Hi from the backend!" });
});

app.use('/find-locations', findLocations);

app.get('/', setResponseHeaders, (req, res) => {
  res.json("Welcome to MidWay server!");
})

app.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

app.listen(5000, () => {
  console.log("Server started on port 5000.");
});