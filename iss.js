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



module.exports = { fetchMyIP };