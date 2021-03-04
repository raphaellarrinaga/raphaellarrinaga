/**
 * @file
 */

(function () {
  // eslint-disable-next-line strict
  'use strict';

  const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    combineMq = require('gulp-combine-mq'),
    livereload = require('gulp-livereload'),
    postcss = require('gulp-postcss'),
    htmlmin = require('gulp-htmlmin'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

  const processors = [
    autoprefixer(),
  ];

  const paths = {
    styles: {
      src: './src/sass/**/*.scss',
      dist: './dist/assets/css'
    },
    html: {
      src: './src/index.html',
      dist: './dist/',
    },
  };

  // Error notifications with notify.
  const reportError = (error) => {
    notify.onError({
      title: 'Gulp error in ' + error.plugin,
      message: error.toString()
    })(error);
  };

  function copyV1() {
    return gulp
      .src('./src/v1/**/*')
      .pipe(gulp.dest('./dist/v1'));
  }

  exports.copyV1 = copyV1;

  function compileHtml() {
    return gulp
      .src(paths.html.src)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(paths.html.dist));
  }

  exports.compileHtml = compileHtml;

  // @todo group compile&watch css.
  // Maybe see package.json npm scripts.
  function compileCSS() {
    return gulp
      .src(paths.styles.src)
      .pipe(
        sass({
          outputStyle: 'compressed',
          sourceComments: false,
          precision: 3,
          includePaths: [].concat(
            'node_modules/normalize-scss/sass'
          ),
        })
      )
      .pipe(postcss(processors))
      .pipe(plumber(reportError))
      .pipe(gulp.dest(paths.styles.dist));
  }

  function watchCSS() {
    return gulp
      .src(paths.styles.src)
      .pipe(
        sass({
          outputStyle: 'nested',
          sourceComments: true,
          precision: 3,
          includePaths: [].concat(
            'node_modules/normalize-scss/sass'
          ),
        })
      )
      .pipe(postcss(processors))
      .pipe(plumber(reportError))
      .pipe(gulp.dest(paths.styles.dist))
      .pipe(livereload());
  }

  exports.watchCSS = watchCSS;

  function watchFiles() {
    livereload.listen();
    gulp.watch(paths.sass, watchCSS);
  }

  exports.watch = watchFiles;

  const build = gulp.series(compileHtml, compileCSS, copyV1);
  exports.build = build;

  // Global task: $ gulp.
  // Same as build. Has to be defined.
  exports.default = build
}());
