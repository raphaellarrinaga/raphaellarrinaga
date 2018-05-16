'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const combineMq = require('gulp-combine-mq');
const concat = require("gulp-concat");
const http = require('http');
const st = require('st');

var paths = {
    sass: './src/sass/**/*.scss',
    js: './src/js/*.js',
    html: './index.html',
};

// Sass compilation
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass({
      sourceComments: true,
      precision: 3,
      includePaths: [].concat(
        'node_modules/normalize-scss/sass'
      )
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(livereload());
});

// Sass production build
gulp.task('sass:build', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
  ];
  return gulp.src(paths.sass)
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 3,
      includePaths: [].concat(
        'node_modules/normalize-scss/sass'
      )
    }))
    .pipe(combineMq({
      beautify: false // false will inline css
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets/css'));
});

/**
 * Build tasks
 */

// Set defaut task
gulp.task('default', ['watch']);

// Build sass files & styleguide
gulp.task('build', ['sass:build']);

// Watch sass files & generate styleguide
gulp.task('watch', ['server'], function() {
  livereload.listen();
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, function (files){
      livereload.changed(files)
  });
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false })
  ).listen(8080, done);
});
