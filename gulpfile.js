var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var base64 = require('gulp-base64');

// MAIN DEPLOYMENT TASK RUNNER //

gulp.task('minify1', function() {
  return gulp.src([
    './_output/hugo-stage-1/**/*.html',
    '!./_output/hugo-stage-1/categories/**/*.html',
    '!./_output/hugo-stage-1/page/**/*.html'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    conservativeCollapse: false,
    minifyCSS: true,
    minifyJS: true,
    sortAttributes: true,
    sortClassName: true,
    minifyURLs: true
  }))
  .pipe(gulp.dest('./_output/hugo-stage-2/'))
});

gulp.task('minify2', function() {
  return gulp.src([
    './_output/hugo-stage-1/categories/**/*.html',
    '!./_output/hugo-stage-1/page/**/*.html'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    conservativeCollapse: false,
    minifyCSS: true,
    minifyJS: true,
    sortAttributes: true,
    sortClassName: true,
    minifyURLs: true
  }))
  .pipe(gulp.dest('./_output/hugo-stage-2/'))
});

gulp.task('copy1', function() {
  return gulp.src([
    './_output/hugo-stage-1/assets/**/*',
    '!./_output/hugo-stage-1/assets/img/t/**/*',
    '!./_output/hugo-stage-1/assets/img/t/'])
  .pipe(gulp.dest('./public/assets'))
});

gulp.task('copy2', function() {
  return gulp.src([
    './_output/hugo-stage-1/**/*.xml',
    './_output/hugo-stage-1/**/*.txt',
    './_output/hugo-stage-1/readme.md',
    '!./_output/hugo-stage-1/categories/**/*.xml'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('copy3', function() {
  return gulp.src([
    './_output/hugo-stage-1/categories/**/*.xml'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('base64', ['minify1', 'minify2'], function () {
  return gulp.src([
    './_output/hugo-stage-2/**/*.html'
  ])
  .pipe(base64({
    baseDir: './_output/hugo-stage-1/',
    extensions: ['jpg'],
    maxImageSize: 20 * 1024 // bytes
  }))
  .pipe(gulp.dest('./public/'));
});

gulp.task('deploy', ['minify1', 'minify2', 'copy1', 'copy2', 'copy3', 'base64']);
