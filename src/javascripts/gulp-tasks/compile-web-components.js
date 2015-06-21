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
const getDirectories = require('../server/get-directories');

var Stream = require('stream');

function slogo() {
	var stream = new Stream.Transform({
			objectMode: true
		}),
		args = [].slice.call(arguments)
		.map(a => (typeof a === 'function' ? a() : a))

	stream._transform = function(data, encoding, callback) {

		console.log.apply(null, args);
		callback(null, data);
	};

	return stream;
}

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
						sharedMemory.webComponents[dir.substr(dir.lastIndexOf('/'))] = utf8_to_b64(file.contents.toString());
					}));

				// JS and CSS can happen in parallel, HTML must happen afterwards.
				return streamqueue(jsTask, cssTask, htmlTask);
			}.bind(this));

			return merge(tasks);
		},
	};

	function utf8_to_b64(str) {
		return new Buffer(str).toString('base64');
	}

};