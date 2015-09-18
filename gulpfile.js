import gulp from 'gulp';

const isProd = process.env.ENV === 'prod';

function onError(err) {
  console.error(err.message);
  this.emit('end');
}

gulp.task('build', ['browserify', 'less', 'html', 'assets', 'vendor']);

gulp.task('browserify', () => {
  const browserify = require('browserify');
  const buffer = require('vinyl-buffer');
  const gulpif = require('gulp-if');
  const source = require('vinyl-source-stream');
  const uglify = require('gulp-uglify');
  return browserify({ standalone: 'LawnMower', debug: !isProd })
    .require('./src/index.js', { entry: true })
    .bundle()
    .on('error', onError)
    .pipe(source(`lawnmower${ isProd ? '.min' : '' }.js`))
    .pipe(buffer())
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('less', () => {
  const autoPrefixer = require('gulp-autoprefixer');
  const gulpif = require('gulp-if');
  const less = require('gulp-less');
  const minifyCSS = require('gulp-minify-css');
  const rename = require('gulp-rename');
  gulp.src('src/index.less')
    .pipe(less({ paths: [] }))
    .on('error', onError)
    .pipe(autoPrefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(rename(`lawnmower${ isProd ? '.min' : '' }.css`))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
  const gulpif = require('gulp-if');
  const minifyHTML = require('gulp-minify-html');
  const template = require('gulp-template');
  return gulp.src('src/index.html')
    .pipe(template({ min: isProd ? '.min' : '' }))
    .pipe(gulpif(isProd, minifyHTML({ comments: true, conditionals: true })))
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', () => {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('vendor', () => {
  const libs = [
    'node_modules/babel-core/browser-polyfill*',
    'node_modules/normalize.css/normalize.css',
    'node_modules/react/dist/react.*',
    'node_modules/flux/dist/Flux.*'
  ];
  return gulp.src(libs)
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/**/*', ['assets']);
});

gulp.task('clean', done => {
  const del = require('del');
  del(['dist'], () => done());
});

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');
  return gulp.src(['src/**/*.js', 'src/**/*.jsx', 'test/**/*.js', 'gulpfile.js', 'server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', done => {
  const babel = require('babel/register');
  const isparta = require('isparta');
  const istanbul = require('gulp-istanbul');
  const mocha = require('gulp-mocha');
  const open = require('open');
  const path = require('path');
  gulp.src('src/**/*.js')
    .pipe(istanbul({ instrumenter: isparta.Instrumenter, includeUntested: true }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('test/unit/**/*.spec.js', { read: false })
        .pipe(mocha({ reporter: 'spec', compilers: { js: babel } }))
        .pipe(istanbul.writeReports({ dir: './dist/coverage', reporters: ['lcov', 'text'] }))
        .on('end', () => {
          open(`file:///${ path.join(__dirname, 'dist', 'coverage', 'lcov-report', 'index.html') }`);
          done();
        });
    });
});
