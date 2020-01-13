const {src, dest, series} = require(`gulp`),
	htmlMin = require('gulp-htmlmin'),
	autoprefixer = require(`gulp-autoprefixer`),
	cleanCss = require('gulp-clean-css'),
	minifyJs = require('gulp-minify');

function buildHtml (cb) {
	src(`*.html`)
		.pipe(htmlMin({
			collapseWhitespace: true,
			removeComments: true}))
		.pipe(dest(`dist/`));

	cb();
}

function buildPhp(cb) {
	src(`*.php`).pipe(dest(`dist/`));
	src(`phpMailer/*.php`).pipe(dest(`dist/phpMailer/`));

	cb();
}

function buildCss(cb) {
	src(`css/style.css`)
		.pipe(autoprefixer({grid: "autoplace"}))
		.pipe(cleanCss())
		.pipe(dest(`dist/css`));

	src([`css/**/*.css`, `!css/style.css`, `!css/**/*.min.css`])
		.pipe(cleanCss())
		.pipe(dest(`dist/css`));

	src(`css/**/*.min.css`)
		.pipe(dest(`dist/css`));

	cb();
}

function buildFonts (cb) {
	src(`fonts/**/**`)
		.pipe(dest(`dist/fonts`));

	cb();
}

function buildImg (cb) {
	src(`img/**/*`)
		// .pipe(imageMin()) // image compression via webStorm plugin, just copy
		.pipe(dest(`dist/img`));

	cb();
}

function buildJs (cb) {
	src(`js/**/*`)
		.pipe(minifyJs({
			noSource : true,
			ext:{
				min:'.js'
			},
			ignoreFiles: ['*.min.js']
		}))
		.pipe(dest(`dist/js`));

	cb();
}

exports.build = series(buildHtml, buildPhp, buildCss, buildFonts, buildImg, buildJs);
exports.buildnoimg = series(buildHtml, buildPhp, buildCss, buildFonts, buildJs);
exports.html = buildHtml;
exports.htmlcss = series(buildHtml, buildCss);
exports.buildimg = buildImg;