var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var gulp = require('gulp');
var rename = require('gulp-rename');
var download = require("gulp-download");
var file = require("gulp-file");
var clean = require("gulp-clean");
var stylus = require('gulp-stylus');
var insert = require('gulp-insert');
var jade = require('gulp-jade');

var options = minimist(process.argv.slice(2), {sting: 'url'});

var BUILD_DEST = 'build';

var value;

gulp.task('default', ['templates'], function() {

});

gulp.task('templates', ['cell-value'], function() {
    gulp.src('./templates/*.styl')
        .pipe(stylus({include: __dirname}))
        .pipe(gulp.dest(BUILD_DEST));

    gulp.src('./templates/*.jade')
        .pipe(jade({
            locals: {
                passed: value,
                left: 384400 - parseFloat(value, 10)
            }
        }))
        .pipe(gulp.dest(BUILD_DEST))
});

gulp.task('spreadsheet-cell', function () {
    if (options.url) {
        return download(options.url)
            .pipe(rename('cell.json'))
            .pipe(gulp.dest(BUILD_DEST));
    }
});

gulp.task('cell-value', ['spreadsheet-cell'], function () {
    var cell = fs.readFileSync(path.join(__dirname, BUILD_DEST, 'cell.json');, 'utf8');
    value = JSON.parse(cell).entry.content.$t.replace(',', '.');
    file('variables.styl', 'passed = ' + value, {src:true})
        .pipe(gulp.dest(BUILD_DEST));
});

gulp.task('clean', function () {
    gulp.src(BUILD_DEST, {read: false})
        .pipe(clean());
});
