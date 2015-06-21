// /* globals module, require */
// 'use strict';

// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');

// module.exports = function(options) {

// 	return {
// 		name: 'uglify',
// 		task: function() {
// 			return this.src(options.jsGlob)
// 				.pipe(concat(options.packageName + '.min.js'))
// 				.pipe(uglify())
// 				.pipe(this.dest(options.distPathAbs));
// 		},
// 	};

// };