const { src, dest, series, watch, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');


const production = !process.env.ROLLUP_WATCH;

const files = {
  scssPath: 'scss/**/*.scss'
}

function scssTask() {
  if (!production)
    return src(files.scssPath)
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(dest('public/'))

  return src(files.scssPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('public/'))
}

function watchTask() {
  watch([files.scssPath],
    parallel(scssTask));
}

exports.default = series(parallel(scssTask), watchTask);
exports.scssTask = series(scssTask);
