var gulp = require('gulp');
var uncss = require('gulp-uncss');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');

gulp.task('uncss', function () {
    return gulp.src('less/style.css')
        	.pipe(uncss({
				html: ['_site/**/*.html'],
				ignore: [/fp/, /pulse/, /collapse/, /active/, /hover/, '@keyframes', /keyframes/, /pulse/, /moz/, /webkit/],
				timeout: 1000
			}))
        	.pipe(gulp.dest('less/'));
});

gulp.task('concat', ['uncss'], function () {
    return gulp.src('less/**/*.css')
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest('assets/css/big/'));
});

gulp.task('minify-css', ['concat'], function() {
	return gulp.src('assets/css/big/style.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('default', ['uncss', 'concat', 'minify-css', 'critical']);
