const {
  src,
  dest,
  series,
  watch
} = require('gulp')

const autoprefixes = require('gulp-autoprefixer')
const prompt = require('prompt-sync')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const sass = require('sass')
const gulpSass = require('gulp-sass')
const mainSass = gulpSass(sass)
const browserSync = require('browser-sync').create()
const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const image = require('gulp-imagemin')
const webp = require('gulp-webp')
const fileInclude = require('gulp-file-include')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')
const ttf2woff = require('gulp-ttf2woff')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')



let isProd = false; // dev by default

const condition = true;

// gulpIf
const gulpIf = () => {
  return src('src/js/**/*.js')
    .pipe(gulpif(condition, uglify()))
    .pipe(dest('app'));
}

// clean
const clean = () => {
  return del(['app'])
}

// fonts
const fonts = () => {
  return src('src/fonts/*')
    .pipe(fonter({
      formats: ['woff', 'woff2', 'ttf']
    }))
    .pipe(ttf2woff2())
    .pipe(ttf2woff())
    .pipe(dest('app/fonts'))
}

// svgSprite
const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          // $('[fill]').removeAttr('fill');
          // $('[stroke]').removeAttr('stroke');
          // $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          example: true,
          render: {
            scss: {
              dest: '../sprite.scss'
            }
          }
        }
      }
    }))
    .pipe(dest('app/img'))
}

// Images
const images = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png',
      'src/images/*.svg'
    ])
    .pipe(image())
    .pipe(dest('app/img'))
}



// stles
const styles = () => {
  return src('src/styles/**/*.scss', {
      sourcemaps: !isProd
    })
    .pipe(plumber(
      notify.onError({
        title: "styles",
        message: "<%= error.message %>",
      })
    ))
    .pipe(mainSass())
    // .pipe(concat('main.scss'))
    .pipe(autoprefixes({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(dest('app', {
      sourcemaps: '.'
    }))
    .pipe(browserSync.stream())
}

// backendStyles
const backendStyles = () => {
  return src('src/styles/**/*.scss')
    .pipe(plumber(
      notify.onError({
        title: 'Backend Styles',
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    // .pipe(concat('main.scss'))
    .pipe(autoprefixes({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}


// scripts
const scripts = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

// backendScripts
const backendScripts = () => {
  return src([
      'src/js/components/**/*.js',
      'src/js/main.js'
    ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}


// html
const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}


const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
}

// webpImg
const webpImages = () => {
  return src([`src/images/**/**.{jpg,jpeg,png}`])
    .pipe(webp())
    .pipe(dest('app/img'))
};


// fileInclude
const htmlInclude = () => {
  return src([`src/**/*.html`])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}


// resources
const resources = () => {
  return src('src/resources/**')
    .pipe(dest('app'))
}


// cache
const cache = () => {
  return src(`app/**/*.{css,js,svg,png,jpg,jpeg,webp,woff2}`, {
      base: 'app'
    })
    .pipe(rev())
    .pipe(revDel())
    .pipe(dest('app'))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest('app'));
};


// rewrite
const rewrite = () => {
  const manifest = readFileSync('app/rev.json');
  src(`app/*.css`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest('app'));
  return src(`app/**/*.html`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest('app'));
}


// watch
watch('src/**/*.html', htmlMinify)
watch(`src/**/*.html`, htmlInclude);
watch('src/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch(`src/images/**/**.{jpg,jpeg,png}`, webpImages);
watch(`src/resources/**`, resources);

const toProd = (done) => {
  isProd = true;
  done();
};



exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.clean = clean
exports.fonts = fonts
exports.svgSprites = svgSprites

exports.default = series(clean, htmlMinify, fonts, styles, scripts, resources, images, svgSprites, watchFiles)
exports.backend = series(clean, fonts, htmlInclude, backendScripts, backendStyles, resources, images, webpImages, svgSprites)
exports.build = series(toProd, clean, fonts, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, htmlMinify);
exports.cache = series(cache, rewrite);
