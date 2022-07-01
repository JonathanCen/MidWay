const { fetchGeocoding } = require('../utils');

// Choices for the users
const listOfActivities = ["Any", "Arts & Entertainment", "Beauty & Spas", "Food", "Hotels & Travel", "Nightlife", "Restaurants", "Shopping"];
const listOfTransportation = ["Driving", "Transit", "Walking", "Cycling", "Flights"];

// Validates that the field is not an empty string
const validateNotUndefined = (field, fieldString, invalidFields) => {
  if (field === undefined) {
    invalidFields.push(fieldString);
    return false;
  }
  return true;
}

// Validates address using Google Geocoding API
const validateAddress = async (address, invalidFields, isFirstAddress=true) => {
  try {
    const addressString = isFirstAddress ? 'firstAddress' : 'secondAddress';
    if (!validateNotUndefined(address, addressString, invalidFields)) {
      return [null, false];
    }
    const geocodingResponse = await fetchGeocoding(address);
    if (geocodingResponse.data.status !== 'OK') {
      invalidFields.push(addressString);
      return [null, false];
    }
    const geographicCoordinates = geocodingResponse.data.results.geometry.location;
    return [geographicCoordinates, true];
  } catch(err) {
    console.log(`Error: ${err}`)
    return [null, false];
  }
}

// Validates that the activity is within the list of activities
const validateActivity = (activity, invalidFields) => {
  if (!validateNotUndefined(activity, 'activity', invalidFields)) {
    return false;
  }
  const lowerListOfActivities = listOfActivities.map((activities) => activities.toLowerCase());
  const lowerActivity = activity.toLowerCase();
  if (!lowerListOfActivities.includes(lowerActivity)) {
    invalidFields.push('activity');
    return false;
  }
  return true;
}

// Validates that the activity is not an empty string
const validateNotEmpty = (activity, invalidFields) => {
  if (activity === '') {
    invalidFields.push('activity');
    return false;
  }
  return true;
}

// Validates that the transportation is not an empty string
const validateTransportation = (transportation, invalidFields) => {
  if (!validateNotUndefined(transportation, 'transportation', invalidFields)) {
    return false;
  }
  const lowerListOfTransportation = listOfTransportation.map((transit) => transit.toLowerCase());
  const lowerTransportation = transportation.toLowerCase();
  if (!lowerListOfTransportation.includes(lowerTransportation)) {
    invalidFields.push('transportation');
    return false;
  }
  return true;
}


// Checks to ensure that the url has valid address and activity
const validateParams = async (req, res, next) =>  {
  const { firstAddress, secondAddress, activity, transportation } = req.params; 

  // Store all the invalid fields when validating
  const invalidFields = [];

  // Validate each field
  // const isValidFirstAddress = true;
  const [firstAddressGeographicCoordinates, isValidFirstAddress] = await validateAddress(firstAddress, invalidFields);
  const [secondAddressGeographicCoordinates, isValidSecondAddress] = await validateAddress(secondAddress, invalidFields, false);
  const isValidActivity = validateActivity(activity, invalidFields);
  const isValidTransportation = validateTransportation(transportation, invalidFields);

  // Pass the fetched data to the next middleware
  res.locals.addressesOfGeographicCoordinates = [firstAddressGeographicCoordinates, secondAddressGeographicCoordinates];

  // Is only valid if all checks return true
  const isValid = isValidFirstAddress && isValidSecondAddress && isValidActivity && isValidTransportation;
  
  // Check whether the inputs are valid, if not sends a 406: not acceptable response
  // Otherwise the request is valid, so continue onto the next middleware
  if (!isValid) {
    res.status(406);
    res.json({message: `One of the field are not valid. Please check again the following fields : ${invalidFields}`});
  } else {
    next();
  }
}

module.exports = validateParams;