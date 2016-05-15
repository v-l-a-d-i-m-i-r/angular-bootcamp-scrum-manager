var mongoApi = require('./lib/mongo-api');

console.log('*** Configuration: \n', require('./config'));

mongoApi.addAdminUser(function(err) {
  if (err === null) {
    console.log('No errors.');
  } else {
    console.log(err);
  }
});
