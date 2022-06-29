const express = require('express');
const app = express();
const axios = require('axios');
const findLocations = require('./src/findLocations');
const setResponseHeaders = require('./src/middleware/setResponseHeaders');

const util = require('@googlemaps/google-maps-services-js/dist/util');
const googelMapsAPI = require('@googlemaps/google-maps-services-js');
const { Client } = require('@googlemaps/google-maps-services-js');

require('dotenv').config();

app.get('/testingAPICall', (req, res) => {
  console.log("getting api");
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.json({ "message": "Hi from the backend!" });
});


app.use('/find-locations', findLocations);

const generatePaths = (steps) => {
  const paths = []
  for (let { polyline } of steps) {
    paths.push(util.decodePath(polyline.points));
  }
  return paths;
}

const calculateDuration = (legs) => {
  const givenDuration = legs.duration.value;
  const estimatedMidPoint = Math.floor(givenDuration / 2);
  console.log(`Given Duration: ${givenDuration}. EstimatedMidPoint: ${estimatedMidPoint}`);
  const steps = legs.steps;
  let runningDuration = 0, stepsIndex = 0;
  while (runningDuration + steps[stepsIndex].duration.value < estimatedMidPoint) {
    runningDuration += steps[stepsIndex].duration.value;
    stepsIndex += 1;
  }
  console.log(`runningDuration: ${runningDuration}, next duration: ${steps[stepsIndex].duration.value}`);
  console.log('Points:')
  const paths = [steps[stepsIndex].start_location] + util.decodePath(steps[stepsIndex].polyline.points) + [steps[stepsIndex].end_location] ;
  const durationOfEachPoint = steps[stepsIndex].duration.value / paths.length;
  const leftOverDuration = estimatedMidPoint - runningDuration;
  const numSteps = Math.floor(leftOverDuration/durationOfEachPoint)-1;
  console.log(durationOfEachPoint, leftOverDuration, numSteps);
  console.log(paths[numSteps]);
  console.log(paths[numSteps+1]);
  return [paths[numSteps],  paths];
}

app.get('/testingGoogleAPI', setResponseHeaders, async (req, res) => {

  let config = {params: {
    origin: "125-18 18th Ave, Flushing, NY 11356",
    destination: "New York",
    mode: "driving",
    key: process.env.GOOGLE_MAPS_API_KEY
  }};

  const client = new Client({});
  const response = await client.directions(config)
    .then(response => response)
    .catch(error => console.log(error));
  const responseData = await response.data;
  console.log(response);
  // const paths = generatePaths(await response.data.routes[0].legs[0].steps); 
  const [midpoint, paths] = calculateDuration(await response.data.routes[0].legs[0]);
  
  res.status(200);
  res.json({paths: paths, midpoint:midpoint, responseData: responseData});
});



app.get('/testingYelpAPI', setResponseHeaders, async (req, res) => {

  let schema = `
      query {
        search(term: "burrito",
                location: "san francisco",
                limit: 5) {
            total
            business {
                name
                url
            }
        }
      }
  `;

  // const query = 
  

  // const axiosInstance = axios.create({
  //   headers: {
  //     "Authorization" : "Bearer ",
  //     "Content-Type" : "application/graphql",
  //   },
  //   data : schema
  // });

  // axiosInstance.get('https://api.yelp.com/v3/graphql')
  //   .then(res => {console.log(res.data); console.log(res)})
  //   .catch(err => {console.log(`Error : ${err}`)});

  const yelpApiUrl = 'https://api.yelp.com/v3/graphql';

  // console.log(query);

  // const client = new GraphQLClient(yelpApiUrl, {
  //   headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}`, "Content-Type" : "application/graphql" },
  // });

  console.log(process.env.YELP_API_KEY)
  try {
    const config = { Authorization: `Bearer ${process.env.YELP_API_KEY}` };
    const data = {
        "query": "business(id garaje-san-francisco) { name id rating url }",
        "variables": {
            "business_name": "garaje-san-francisco"
        }
      };
    console.log(schema);
    const response = await axios.post(yelpApiUrl, {query: schema}, {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
    });
    // const data = await client.request(query, {term : "burrito", location : "san francisco", offset: 5});
    console.log(response);
    res.status(200);
    res.json({message: "Hit testing Yelp API endpoint.", response: response.data});
  } catch (err) {
    console.log(`Error ${err}`);
    res.status(400);
    res.json({message: `Error in the server. Error: ${err}`});
  }
})


app.get('/', setResponseHeaders, (req, res) => {
  res.json("Welcome to MidWay server!");
});

app.get('*', setResponseHeaders, (req, res) => {
  res.status(404);
  res.json({message: "404 Error. This endpoint doesn't exist."});
})

app.listen(5000, () => {
  console.log("Server started on port 5000.");
});
