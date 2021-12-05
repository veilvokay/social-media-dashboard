// Inititalize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// Use dart-sass for @use
// sass.compiler = require('dart-sass');

// Sass Task
function sassTask() {
    return src('app/styles/styles.sass', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: 0,
            },
        },
    });
    cb();
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// Wartch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['app/styles/**/*.sass', 'app/**/*.js'],
        series(sassTask, jsTask, browserSyncReload),
    );
}

// Default Gulp Task
exports.default = series(sassTask, jsTask, browserSyncServe, watchTask);