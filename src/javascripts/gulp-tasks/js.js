/* globals module, require */
'use strict';

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const tap = require('gulp-tap');

module.exports = function(options) {

	/**
	 * Grabs all the js, 
	 * concating it and uglifying it.
	 * The result is stuck on the js property 
	 * on the shared memory.
	 */
	return {
		name: 'js',
		task: function(sharedMemory) {
			console.log('options.glob.js', options.glob.js);
			return this.src([options.glob.js, 
				'!' + options.glob.serverFiles, 
				'!' + options.glob.gulpFiles, 
				'!' + options.glob.testFiles])
				.pipe(concat(options.packageName + '.min.js'))
				.pipe(uglify())
				.pipe(tap(file => sharedMemory.js = file.contents.toString()));
		},
	};

};