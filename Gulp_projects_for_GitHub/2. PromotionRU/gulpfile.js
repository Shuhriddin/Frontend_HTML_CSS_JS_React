const {
    src,
    dest,
    series,
    watch
} = require('gulp')

const autoprefixes = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
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
// const webp = require('gulp-webp')
const fileInclude = require('gulp-file-include')
const typograf = require('gulp-typograf');
const image = require('gulp-image')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')

// ======================================================================clean=============================================================================
const clean = () => {
    return del(['dist'])
}

// ======================================================================svgSprites=============================================================================
// const svgSprites = () => {
//     return src('src/images/svg/**/*.svg')
//     .pipe(svgSprite({
//         mode: {
//             stack: {
//                 sprite: './sprite.svg'
//             }
//         }
//     }))
//     .pipe(dest('app/img'))
// }

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
                        css: {
                            dest: '../sprite.css'
                        }
                    }
                }
            }
        }))
        .pipe(dest('app/img'))
}

// ======================================================================images=============================================================================

const images = () => {
    return src([
            'src/images/**/*.jpg',
            'src/images/**/*.png',
            'src/images/**/*.jpeg',
            'src/images/*.svg'
        ])
        .pipe(image())
        .pipe(dest('app/img'))
}

// ======================================================================styles=============================================================================

const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixes({
            cascade: false,
        }))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

// ======================================================================scripts=============================================================================

const scripts = () => {
    return src([
            'src/js/components/**/*.js',
            'src/js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(sourcemaps.write())
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

// ======================================================================htmlMinify=============================================================================

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}



const htmlInclude = () => {
    return src('src/**/*.html')
      .pipe(fileInclude({
        prefix: '@',
        basepath: '@file'
      }))
      .pipe(typograf({
        locale: ['ru', 'en-US']
      }))
      .pipe(dest("app"))
      .pipe(browserSync.stream());
  }

// ======================================================================watchFiles=============================================================================

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
}

// ======================================================================resources=============================================================================

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('app'))
}



watch('src/**/*.html', htmlMinify, htmlInclude)
watch('src/**/*.html', htmlInclude)
watch('src/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)





exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify


exports.default = series(clean, resources, htmlMinify, htmlInclude, styles, scripts, svgSprites, images, watchFiles)
exports.build = series(clean, scripts, styles, resources, images, svgSprites, htmlMinify, htmlInclude);