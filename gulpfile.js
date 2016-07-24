// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins") ({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'merge-stream', 'run-sequence'],
	replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'www/public/';

gulp.task('default', ['js', 'css']);

gulp.task('setup', function(done) {
	plugins.runSequence('bower', ['js', 'css'], done);	
});

gulp.task('bower', function() {
	return plugins.bower();
});

gulp.task('js', function() {
	var jsFiles = ['src/js/*'];

	gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(plugins.filter('**/*.js'))
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));
});

gulp.task('css', function() {
	var lessFiles = ['src/less/*'];

	var cssStream = gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter('**/*.css'))
		.pipe(plugins.order([
			'normalize.css',
			'*'
		]));

	var lessStream = gulp.src(plugins.mainBowerFiles().concat(lessFiles))
		.pipe(plugins.filter('**/*.less'))
		.pipe(plugins.less());

	return plugins.mergeStream(cssStream, lessStream)
		.pipe(plugins.concat('main.css'))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest(dest + 'css'));
});
