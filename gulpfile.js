// including plugins
var gulp = require('gulp');
var minifyHtml = require("gulp-minify-html");
var rename = require("gulp-rename");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var server = require( 'gulp-develop-server' );

// task
gulp.task('minify-html', function () {
    gulp.src('./html/*.html') // path to your files
        .pipe(minifyHtml())
        .pipe(gulp.dest('./'));
});


// task
gulp.task('minify-css', function () {
    gulp.src('./assets/css/main.css') // path to your file
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/css/'));
});


// task
gulp.task('minify-js', function () {
    gulp.src('./assets/javascript/main.js') // path to your files
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/javascript/'));
});

//building and running task
gulp.task('build', ['minify-html','minify-js', 'minify-css']);
// run server
gulp.task( 'server:start', function() {
    server.listen( { path: './server.js' } );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
    gulp.watch( [ './server.js' ], server.restart );
});