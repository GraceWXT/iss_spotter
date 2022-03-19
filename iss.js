const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      // console.log(typeof error); //object
      return callback(error, null);
    }
    if (response.statusCode !== 200) { //response must be an object
      const errMsg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(errMsg), null);
    }
    // console.log(typeof body); //body is a string
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=82c8bea0-a7bc-11ec-84d5-b1422dff8f50`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body} (end of response body)`;
      callback(Error(errMsg), null);
      return;
    }
    const data = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };
    return callback(null, data);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyoverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body} (end of response body)`;
      callback(Error(errMsg), null);
      return;
    }
    const data = JSON.parse(body).response;
    return callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes };