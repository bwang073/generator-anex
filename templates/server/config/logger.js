var winston = require('winston');
var path = require('path');
var logger = new (winston.Logger)({
	transports : [ new (winston.transports.Console)({
		level : 'debug',
		colorize : true,
		timestamp : true
	}), new (winston.transports.File)({
		filename : 'my-project.log',
		dirname : '/logs',
		level : 'info',
		colorize : true,
		timestamp : true,
		maxsize : 20480,
		maxFiles : 10
	}) ]
});
module.exports = logger;