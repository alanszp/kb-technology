var gulp  = require('gulp');
var gutil = require('gulp-util');


// Lint Task
var jshint = require('gulp-jshint');
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/public/javascripts/lib/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Mocha
var mocha = require('gulp-mocha');
gulp.task('mocha', function () {
  process.env.NODE_ENV = 'test';
  return gulp.src(['./tests/*.test.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec'
      }))
      .on('error', gutil.log);
});

// Bower
var gulpBowerFiles = require('gulp-bower-files');
gulp.task("bower-files", function(){
    gulpBowerFiles().pipe(gulp.dest("app/public/javascripts/lib/"));
});
