var gulp = require('gulp');
var less = require('gulp-less');
var csscomb = require('gulp-csscomb');
var uncss = require('gulp-uncss');
var cleanCSS = require('gulp-clean-css');
var critical = require('critical');
var imageop = require('gulp-image-optimization');
var imageminJpegtran = require('imagemin-jpegtran');
var concat = require('gulp-concat');

gulp.task('less', function () {
  return gulp.src('./_less/style.less')
	.pipe(less())
	.pipe(gulp.dest('./assets/css/big'));
});

gulp.task('styles', ['less'], function() {
  return gulp.src('assets/css/big/style.css')
    .pipe(csscomb())
    .pipe(gulp.dest('assets/css/combed'));
});

gulp.task('uncss', ['styles'], function () {
    return gulp.src('assets/css/combed/style.css')
        	.pipe(uncss({
				html: ['../../novelistxyz/*.html','../../novelistxyz/**/*.html','../../novelistxyz/**/**/*.html'],
				ignore: [/fp/, /pulse/, /collapse/, /active/, /hover/, '@keyframes', /keyframes/, /pulse/, /moz/, /webkit/, /collapsing/, /pace/, /shrink/, /footer-show/, /cc_/, /code/],
				timeout: 1000
			}))
        	.pipe(gulp.dest('assets/css/uncss/'));
});

gulp.task('minify-css', ['uncss'], function() {
	return gulp.src('assets/css/uncss/style.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('critical', ['minify-css'], function() {
	critical.generate({
		base: '../../novelistxyz/',
		src: 'index.html',
		css: ['assets/css/style.css'],
		dest: './_includes/critical-css/critical_home.css',
		minify: true,
		include: [/cc_/],
		ignore: ['@font-face']
	});
});

gulp.task('critical1', ['critical'], function() {
	critical.generate({
		base: '../../novelistxyz/',
		src: ('novels/only-you-know-what-it-means/index.html'),
		css: ['assets/css/style.css'],
		dest: './_includes/critical-css/critical_pages.css',
		minify: true,
		include: [/blog-index/,'blockquote', /hr/, /cc_/, /meta/, /word-count/],
		ignore: ['@font-face']
	});
});

gulp.task('critical2', ['critical1'], function() {
	critical.generate({
		base: '../../novelistxyz/',
		src: ('blog/index.html'),
		css: ['assets/css/style.css'],
		dest: './_includes/critical-css/critical_index.css',
		minify: true,
		include: [/cc_/, /tag-list/],
		ignore: ['@font-face']
	});
});


gulp.task('css', ['less','styles', 'uncss', 'minify-css', 'critical', 'critical1', 'critical2']);


gulp.task('scripts', function() {
  return gulp.src(['./assets/js/bootstrap.min.js','./assets/js/cookieconsent.min.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('jpgs', function(cb) {
    gulp.src('assets/img-input/*.jpg')
    .pipe(imageop({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
      use: [imageminJpegtran()]
    }))
    .pipe(gulp.dest('assets/img')).on('end', cb).on('error', cb);
});
