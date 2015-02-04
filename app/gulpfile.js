var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var del = require('del');

var basePath = './src/';

gulp.task('default', function() {
  return gulp.src([
        basePath+'utils/**/*.coffee',
        basePath+'models/**/*.coffee',
        basePath+'views/**/*.coffee',
        basePath+'app.coffee'])

    .pipe(coffee())
    .pipe(concat('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist', function() {
  return gulp.src(['./dist/**/*'])
    .pipe(gulp.dest('../cordova/www'));
});

gulp.task('clean', function() {
  del(['../cordova/www/**', 'dist/js/**'], {
    force: true
  });
});