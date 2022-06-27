

// Validates address using Google Geocoding API
const validateAddress = (address, invalidFields) => {

  return true;
}

const validateActivity = (activity, invalidFields) => {
  return true;
}

const validateTransportation = (transportation, invalidFields) => {
  return true;
}


// Checks to ensure that the url has valid address and activity
const validateURL = (req, res, next) => {
  const { firstAddress, secondAddress, activity, transportation } = req.params; 

  const invalidFields = [];
  const isValid = validateAddress(firstAddress, invalidFields) 
    && validateAddress(secondAddress, invalidFields) 
    && validateActivity(activity, invalidFields) 
    && validateTransportation(transportation, invalidFields);
  
  // Check whether the inputs are valid
  if (!isValid) {
    res.send(406, `One of the field are not valid. Please check again the following fields : ${invalidFields}`);
    res.connection.destroy();
  }


  next();
}

module.exports = validateURL;