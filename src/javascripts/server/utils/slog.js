/*global require, module, console*/
'use strict';

const Stream = require('stream');

/**
 * Can be piped into, and it will write 
 * the supplied value to the console.
 * Functions will be evaluated before 
 * being written to the console.
 */
module.exports = function slog() {
	var stream = new Stream.Transform({
			objectMode: true
		}),
		args = [].slice.call(arguments)
		.map(a => (typeof a === 'function' ? a() : a));

	stream._transform = function(data, encoding, callback) {

		console.log.apply(null, args);
		callback(null, data);
	};

	return stream;
};