/**
 * @file
 */

(function () {
  // eslint-disable-next-line strict
  'use strict';

  const gulp = require('gulp');
  // const sass = require('gulp-sass');
  const sass = require('gulp-sass')(require('sass'));
  const autoprefixer = require('autoprefixer');
  const browserSync = require('browser-sync').create();
  const postcss = require('gulp-postcss');
  const htmlmin = require('gulp-htmlmin');
  const notify = require('gulp-notify');
  const plumber = require('gulp-plumber');
  // const imagemin = require("gulp-imagemin");
  const newer = require("gulp-newer");

  const processors = [
    autoprefixer(),
  ];

  const paths = {
    styles: {
      src: './src/assets/sass/**/*.scss',
      dist: './dist/assets/css'
    },
    files: {
      src: './src/assets/files/**/*',
      dist: './dist/assets/files'
    },
    img: {
    //   src: './src/assets/img/**/*',
      src: './src/assets/img/**/*.{jpg,jpeg,png,svg,gif,webp}',
      dist: './dist/assets/img'
    },
    html: {
      src: './src/index.html',
      dist: './dist/',
    },
    redirects: {
      src: './src/_redirects',
      dist: './dist/'
    }
  };

  // Error notifications with notify.
  const reportError = (error) => {
    notify.onError({
      title: 'Gulp error in ' + error.plugin,
      message: error.toString()
    })(error);
  };

  function copyRedirects() {
    return gulp
      .src(paths.redirects.src, { allowEmpty: true }) // allowEmpty évite une erreur si le fichier manque
      .pipe(gulp.dest(paths.redirects.dist));
  }
  exports.copyRedirects = copyRedirects;

  async function images() {
    const imagemin = (await import("gulp-imagemin")).default;
    const mozjpeg = (await import("imagemin-mozjpeg")).default;
    const optipng = (await import("imagemin-optipng")).default;
    const svgo = (await import("imagemin-svgo")).default;

    // return gulp
    //   .src(paths.img.src)
    //   .pipe(gulp.dest(paths.img.dist));
    return gulp
      .src(paths.img.src, { buffer: true })
      .pipe(newer(paths.img.dist))
      .pipe(
        imagemin([
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
          // svgo({
          //   plugins: [
          //     { name: "removeViewBox", active: false },
          //     { name: "cleanupIDs", active: false },
          //   ],
          // }),
        ], {
          verbose: true,
        })
      )
      .pipe(gulp.dest(paths.img.dist));
  }

  exports.images = images;

  function files() {
    return gulp
      .src(paths.files.src)
      .pipe(gulp.dest(paths.files.dist));
  }

  exports.files = files;

  function compileHtml() {
    return gulp
      .src(paths.html.src)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(paths.html.dist));
  }

  exports.compileHtml = compileHtml;

  function compileCSS() {
    return gulp
      .src(paths.styles.src)
      .pipe(
        sass({
          style: 'compressed',
          sourceComments: false,
          precision: 3,
          // includePaths: [].concat(
          //   'node_modules/normalize-scss/sass'
          // ),
        })
      )
      // .pipe(postcss(processors))
      // .pipe(plumber(reportError))
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
      .pipe(browserSync.stream());
  }

  exports.watchCSS = watchCSS;

  function serve(done) {
    browserSync.init({
      server: {
        baseDir: './dist',
      },
      port: 5000,
      ui: false,
      open: false,
      injectChanges: true,
    });
    done();
  }

  function watchFiles() {
    // On surveille le HTML, on compile, PUIS on recharge
    gulp.watch(paths.html.src, gulp.series(compileHtml, (done) => {
      browserSync.reload();
      done();
    }));
    gulp.watch(paths.styles.src, watchCSS);
  }

  exports.watch = watchFiles;
  const watch = watchFiles;
  const dev = gulp.series(serve, watch);
  exports.dev = dev;

  const dist = gulp.series(compileHtml, compileCSS, images, files, copyRedirects);
  exports.dist = dist;

  // Global task: $ gulp.
  // Same as dist. Has to be defined.
  exports.default = dist
}());
