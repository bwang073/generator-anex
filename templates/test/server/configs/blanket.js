var path = require('path');

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: path.join(__dirname, '..', '..', '..', 'server')
});