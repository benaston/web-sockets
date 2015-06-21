/* globals module, require */
'use strict';

const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const minifyCss = require('gulp-minify-css');
const less = require('gulp-less');
const tap = require('gulp-tap');
const concat = require('gulp-concat');
const urlEmbed = require('gulp-css-base64');
const uglify = require('gulp-uglify');
const streamqueue = require('streamqueue');
const getDirectories = require('../utils/get-directories');
const toBase64 = require('../utils/to-base-64');

module.exports = function(options) {

	/**
	 * Responsible for enumerating all the web 
	 * components, processing their less and js 
	 * and then inlining into a template, ready 
	 * to be imported into the main index.html 
	 * of the application.
	 */
	return {
		name: 'compileWebComponents',
		task: function(sharedMemory) {

			var tasks = getDirectories(options.dirAbs.webComponents).map(function(dir) {
				var temp, jsTask, cssTask, htmlTask;

				temp = {
					js: null,
					css: null
				};

				jsTask = this.src(path.join(dir, options.dir.javascripts, '*.js'))
					.pipe(concat('unused'))
					.pipe(uglify())
					.pipe(tap(file => temp.js = file.contents.toString()));

				cssTask = this.src(path.join(dir, options.dir.stylesheets, 'index.less'))
					.pipe(less())
					.pipe(urlEmbed({
						baseDir: dir,
						maxWeightResource: 40000,
					}))
					.pipe(minifyCss())
					.pipe(tap(file => temp.css = file.contents.toString()));

				htmlTask = this.src(path.join(dir, options.dir.templates, options.fileName.indexTemplate))
					.pipe(replace('{{css}}', () => temp.css))
					.pipe(replace('{{javascript}}', () => temp.js))
					.pipe(rename('index.html'))
					.pipe(this.dest(path.join(dir, options.dir.dist)))
					.pipe(tap(function(file) {
						sharedMemory.webComponents[dir.substr(dir.lastIndexOf('/'))] = toBase64(file.contents.toString());
					}));

				// streamqueue will run the streams to completion in order.
				// merge was attempted for js and css, but I couldn't get 
				// it to work.
				return streamqueue(jsTask, cssTask, htmlTask);
			}.bind(this));

			return merge(tasks);
		},
	};

};