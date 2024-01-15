const {
    src,
    dest,
    series,
    watch
} = require('gulp');

const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del')
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
// const sass = require('sass')
// const gulpSass = require('gulp-sass')
// const mainSass = gulpSass(sass)
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const image = require('gulp-image');
const fileInclude = require('gulp-file-include')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')
const ttf2woff = require('gulp-ttf2woff')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps');



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

// =============================================================SVGSPRITE+++++++++++++++++++++++++++++++++++++++++++++
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
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
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
// =============================================================IMAGE+++++++++++++++++++++++++++++++++++++++++++++

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

// =============================================================STYLES+++++++++++++++++++++++++++++++++++++++++++++
// stles
const styles = () => {
    return src('src/styles/**/*.css') // Получаем все css фай
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixes({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('app'))
        .pipe(sourcemaps.write())
        .pipe(browserSync.stream())
}

// backendStyles
const backendStyles = () => {
    return src('src/styles/**/*.css') // Получаем все css фай
        .pipe(concat('main.css'))
        .pipe(autoprefixes({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

// =============================================================SCRIPT+++++++++++++++++++++++++++++++++++++++++++++
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


// =============================================================HTMLMINIFY+++++++++++++++++++++++++++++++++++++++++++++

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

// =============================================================WATCHFILE+++++++++++++++++++++++++++++++++++++++++++++

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
}

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
// =============================================================RESOURCES+++++++++++++++++++++++++++++++++++++++++++++

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('app'))
}

// =============================================================RESOURCES+++++++++++++++++++++++++++++++++++++++++++++
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



watch('src/**/*.html', htmlMinify);
watch(`src/**/*.html`, htmlInclude);
watch('src/**/*.css', styles);
watch('src/**/*.js', scripts);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/resources/**', resources);


const toProd = (done) => {
    isProd = true;
    done();
};



exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.svgSprites = svgSprites
exports.fonts = fonts
exports.clean = clean

exports.default = series(clean, htmlMinify, fonts, styles, scripts, resources, images, svgSprites, watchFiles)
exports.backend = series(clean, fonts, htmlInclude, backendScripts, backendStyles, resources, images, svgSprites)
exports.build = series(toProd, clean, fonts, htmlInclude, scripts, styles, resources, images, svgSprites, htmlMinify);
exports.cache = series(cache, rewrite);



// const { src, dest, series, watch} = require('gulp');

// const concat = require('gulp-concat');
// const del = require('del')
// const htmlMin = require('gulp-htmlmin');
// const autoprefixes = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const svgSprite = require('gulp-svg-sprite');
// const browserSync = require('browser-sync').create();
// const image = require('gulp-image');
// const uglify = require('gulp-uglify-es').default;
// const babel = require('gulp-babel');
// const notify = require('gulp-notify');
// const sourcemaps = require('gulp-sourcemaps');



// const clean = () => {
//     return del(['app'])
// }

// // =============================================================SVGSPRITE+++++++++++++++++++++++++++++++++++++++++++++
// const svgSprites = () => {
//     return src('src/images/svg/**/*.svg')
//     .pipe(svgSprite({
//         mode: {
//             stack: {
//                 sprite: '../sprite.svg'
//             }
//         }
//     }))
//     .pipe(dest('app/img'))
// }
// // =============================================================IMAGE+++++++++++++++++++++++++++++++++++++++++++++

// const images = () => {
//     return src([
//         'src/images/**/*.jpg',
//         'src/images/**/*.jpeg',
//         'src/images/**/*.png',
//         'src/images/*.svg'
//     ])
//     .pipe(image())
//     .pipe(dest('app/img'))
// }

// // =============================================================STYLES+++++++++++++++++++++++++++++++++++++++++++++
// const styles = () => {
//     return src('src/styles/**/*.css') // Получаем все css фай
//     .pipe(sourcemaps.init())
//     .pipe(concat('main.css'))
//     .pipe(autoprefixes({
//         cascade: false,
//     }))
//     .pipe(cleanCSS({
//         level: 2
//     }))
//     .pipe(dest('app'))
//     .pipe(sourcemaps.write())
//     .pipe(browserSync.stream())
// }

// // =============================================================SCRIPT+++++++++++++++++++++++++++++++++++++++++++++
// const scripts = () => {
//     return src([
//         'src/js/components/**/*.js',
//         'src/js/main.js'
//     ])
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//         presets: ['@babel/preset-env']
//     }))
//     .pipe(concat('app.js'))
//     .pipe(uglify({
//         toplevel: true
//     }).on('error', notify.onError()))
//     .pipe(sourcemaps.write())
//     .pipe(dest('app'))
//     .pipe(browserSync.stream())
// }


// // =============================================================HTMLMINIFY+++++++++++++++++++++++++++++++++++++++++++++

// const htmlMinify = () => {
//     return src('src/**/*.html')
//     .pipe(htmlMin({
//         collapseWhitespace: true,
//     }))
//     .pipe(dest('app'))
//     .pipe(browserSync.stream())
// }

// // =============================================================WATCHFILE+++++++++++++++++++++++++++++++++++++++++++++

// const watchFiles = () => {
//     browserSync.init({
//         server: {
//             baseDir: 'app'
//         }
//     })
// }
// // =============================================================RESOURCES+++++++++++++++++++++++++++++++++++++++++++++

// const resources = () => {
//     return src('src/resources/**')
//     .pipe(dest('app'))
// }





// watch ('src/**/*.html', htmlMinify)
// watch ('src/**/*.css', styles)
// watch ('src/**/*.js', scripts)
// watch ('src/images/svg/**/*.svg', svgSprites)
// watch ('src/resources/**', resources)



// exports.styles = styles
// exports.scripts = scripts
// exports.htmlMinify = htmlMinify
// exports.svgSprites = svgSprites
// exports.clean = clean

// exports.default = series(clean, resources, htmlMinify, styles, scripts, images, svgSprites, watchFiles)