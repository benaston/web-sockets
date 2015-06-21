'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function getDirectories(srcPath) {
	return fs.readdirSync(srcPath).filter(function(file) {
		return fs.statSync(path.join(srcPath, file)).isDirectory();
	}).map(p => path.join(srcPath, p));
};