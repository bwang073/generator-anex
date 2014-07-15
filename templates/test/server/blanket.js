var path = require('path');
var appDir = path.join(__dirname, '..', '..', 'app.js');
var routeDir = path.join(__dirname, '..', '..', 'routes');
var config = path.join(__dirname, '..', '..', 'config');

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: [appDir, routeDir, config]
});