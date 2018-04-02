import gulp from 'gulp'
import browserSync from 'browser-sync'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'
import del from 'del'

const filesJS = [
  'dev/js/master.js'
]

const paths = {
  html: {
    dev: 'dev/*.pug',
    app: './'
  },
  styles: {
    dev: ['dev/sass/**/*.sass', 'dev/sass/**/*.scss'],
    app: 'app/css'
  },
  scripts: {
    dev: 'dev/js/**/*.js',
    app: 'app/js'
  },
  fonts: {
    dev: 'dev/fonts/**/*',
    app: 'app/fonts'
  },
  img: {
    dev: 'dev/images/**/*',
    app: 'app/images'
  }
}

export function server () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  })

  gulp.watch(paths.html.dev, html)
  gulp.watch(paths.styles.dev, styles)
  gulp.watch(paths.scripts.dev, scripts)
  gulp.watch(paths.fonts.dev, fonts)
  gulp.watch(paths.img.dev, image)
}

export function html () {
  return gulp.src(paths.html.dev)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.html.app))
    .pipe(browserSync.reload({stream: true}))
}

export function styles () {
  return gulp.src(paths.styles.dev)
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'master',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.app))
    .pipe(browserSync.reload({stream: true}))
}

export function scripts () {
  return gulp.src(filesJS)
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('master.min.js'))
    .pipe(gulp.dest(paths.scripts.app))
    .pipe(browserSync.reload({stream: true}))
}

export function fonts () {
  return gulp.src(paths.fonts.dev)
    .pipe(gulp.dest(paths.fonts.app))
}

export function image () {
  del([paths.img.app])
  return gulp.src(paths.img.dev)
    .pipe(cache(imagemin({
      optimizationLevel: 5
    })))
    .pipe(gulp.dest(paths.img.app))
}

export const clean = () => del([ 'app' ])
export const clear = () => cache.clearAll()

const build = gulp.series(clean, image, fonts, styles, html, scripts, server, clear)
gulp.task('build', build)

export default build
