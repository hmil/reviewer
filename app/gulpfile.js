var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src(['./src/utils/**/*.coffee', './src/models/**/*.coffee', './src/views/**/*.coffee', './src/app.coffee'])
    .pipe(coffee())
    .pipe(concat('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/'));
});