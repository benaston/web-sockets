/* globals module, require */
'use strict';

const concat = require('gulp-jshint');

module.exports = function(options) {

	return {
		name: 'jshint',
		task: function() {
			// return this.src([options.glob.js, '!' + options.glob.gulpFiles, '!' + options.glob.testFiles])
			// 	.pipe(concat(options.packageName + '.min.js'))
			// 	.pipe(uglify())
			// 	.pipe(tap(file => sharedMemory.js = file.contents.toString()));
		},
	};

};