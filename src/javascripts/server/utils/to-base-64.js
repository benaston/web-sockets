/*global module, Buffer*/
'use strict';

module.exports = function toBase64(str) {
	return new Buffer(str).toString('base64');
};