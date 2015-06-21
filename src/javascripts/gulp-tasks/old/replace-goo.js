// /* globals module, require */
// 'use strict';

// const replace = require('gulp-replace');

// module.exports = function(options) {

// 	*
// 	 * TODO: ask how I can replace the contents of the html file
// 	 * with the in memory representation of the css.
	 
// 	return {
// 		name: 'replace',
// 		task: function() {
// 			return this.src([options.indexHtmlSrc])
// 				.pipe(replace(/{{css}}/g, '$1foo'))
// 				.pipe(this.dest(options.distPathAbs));
// 		},
// 	};

// };