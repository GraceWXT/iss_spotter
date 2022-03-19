const { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes} = require("./iss");

// Manually testing:
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("test ip", (error, data) => {
//   if (error) {
//     console.log("It didn't work! Error object:" , error, "\nend of Error Object");
//     return;
//   }
//   console.log('It worked! Returned coordinates:' , data);
// })

// fetchISSFlyoverTimes({ latitude: 'test lat', longitude: 'test lon' }, (error, response) => {
//   if (error) {
//     console.log("It didn't work! Error object:" , error, "\nend of Error Object");
//     return;
//   }
//   console.log('It worked! Returned flyover times:' , response);
// });
