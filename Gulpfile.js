var gulp = require('gulp');
var sass = require('gulp-sass');
var env = require('gulp-env');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var env = process.env.NODE_ENV; //export NODE_ENV=production / development

gulp.task('styles', function() {
	var sass_options = (env === 'production') ? {outputStyle: 'compressed'} : {};
	gulp.src('sass/**/*.scss')
		.pipe(sass(sass_options).on('error', sass.logError))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./public/stylesheets/'));
});

// TODO: yes, this is pointless. Add uglify later
gulp.task('js', function() {
	gulp.src('js/**/*.js')
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('copyjs', function () {
	// jquery
	gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss',['styles']);
	gulp.watch('js/**/*.js', ['js']);
});

gulp.task('default', ['styles', 'js', 'watch']);