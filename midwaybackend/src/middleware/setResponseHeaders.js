// Sets response headers so the client side doesn't encounter a cors error
const setResponseHeaders = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  });
  next();
}

module.exports = setResponseHeaders;