/* globals module, require */
'use strict';

const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');

module.exports = function(options) {

	/**
	 * Help chatroom for gulp-css-base64: https://gitter.im/zckrs/gulp-css-base64.
	 * Todo: get fonts working.
	 */
	return {
		name: 'replace',
		task: function(sharedMemory) {
			return this.src(path.join(options.dirAbs.templates, options.fileName.indexTemplate))
				.pipe(replace('{{css}}', sharedMemory.css))
				.pipe(replace('{{web-components}}', getWebComponentsString(sharedMemory.webComponents)))
				.pipe(replace('{{javascript}}', sharedMemory.js))
				.pipe(rename('index.html'))
				.pipe(this.dest(options.dirAbs.dist));
		},
	};

	function getWebComponentsString(webComponentsObject) {
		// console.log(webComponentsObject);
		return Object.keys(webComponentsObject).reduce(function(p,c) {
			return p + '<link rel="import" href="data:text/html;base64,' + webComponentsObject[c] + '"/>\n\t';
		}, '');
	}
};