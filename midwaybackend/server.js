const express = require('express');
const app = express();

app.get('/testingAPICall', (req, res) => {
  console.log("getting api");
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  })
  res.json({ "message": "Hi from the backend!" });
})

app.listen(5000, () => {
  console.log("Server started on port 5000.");
});