const { nextISSTimesForMyLocation} = require("./iss");

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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let time of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});

