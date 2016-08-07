var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var base64 = require('gulp-base64');

// MAIN DEPLOYMENT TASK RUNNER //

gulp.task('minify1' , function() {
  return gulp.src([
    './_output/hugo-stage-1/**/*.html',
    '!./_output/hugo-stage-1/categories/**/*.html',
    '!./_output/hugo-stage-1/page/**/*.html'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    sortAttributes: true,
    sortClassName: true,
    minifyURLs: true
  }))
  .pipe(gulp.dest('./_output/hugo-stage-2/'))
});

gulp.task('minify2', ['minify1'], function() {
  return gulp.src([
    './_output/hugo-stage-1/categories/**/*.html',
    '!./_output/hugo-stage-1/page/**/*.html'
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    sortAttributes: true,
    sortClassName: true,
    minifyURLs: true
  }))
  .pipe(gulp.dest('./_output/hugo-stage-2/'))
});

gulp.task('copy1', ['minify2'], function() {
  return gulp.src([
    './_output/hugo-stage-1/assets/**/*',
    '!./_output/hugo-stage-1/assets/img/t/**/*',
    '!./_output/hugo-stage-1/assets/img/t/'])
  .pipe(gulp.dest('./public/assets'))
});

gulp.task('copy2', ['copy1'], function() {
  return gulp.src([
    './_output/hugo-stage-1/index.xml',
    './_output/hugo-stage-1/robots.txt',
    './_output/hugo-stage-1/sitemap.xml'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('copy3', ['copy2'], function() {
  return gulp.src([
    './_output/hugo-stage-1/categories/*/index.xml'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('copy4', ['copy3'], function() {
  return gulp.src([
    './_output/hugo-stage-1/tag/*/index.xml'
  ])
  .pipe(gulp.dest('./public/tag/'))
});

gulp.task('copy5', ['copy4'], function() {
  return gulp.src([
    './_output/hugo-stage-1/*/index.xml',
    '!./master-preprocessed/categories/index.xml'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('copy6', ['copy5'], function() {
  return gulp.src([
    './_output/hugo-stage-1/readme.md'
  ])
  .pipe(gulp.dest('./public/'))
});

gulp.task('base64', ['copy5'], function () {
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

gulp.task('deploy', ['minify1', 'minify2', 'copy1', 'copy2', 'copy3', 'copy4', 'copy5', 'copy6', 'base64']);
