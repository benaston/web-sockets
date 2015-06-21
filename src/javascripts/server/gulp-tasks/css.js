/* globals module, require */
'use strict';

const path = require('path');
const less = require('gulp-less');
const urlEmbed = require('gulp-css-base64');
const minifyCss = require('gulp-minify-css');
const tap = require('gulp-tap');

module.exports = function(options) {

	var mainLessFilePath = path.join(options.dirAbs.stylesheets, 'application', 'main.less');

	/**
	 * Help chatroom for gulp-css-base64: https://gitter.im/zckrs/gulp-css-base64.
	 * Grabs all the less, converts it to CSS, 
	 * inlines the URL links, then sticks it on 
	 * a property on the shared memory.
	 */
	return {
		name: 'css',
		task: function(sharedMemory) {
			return this.src(mainLessFilePath)
				.pipe(less())
				.pipe(urlEmbed({
					baseDir: options.dirAbs.src,
					maxWeightResource: 40000,
				}))
				.pipe(minifyCss())
				.pipe(tap(file => sharedMemory.css = file.contents.toString()));
		},
	};

};