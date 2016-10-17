var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');

var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
var sassSources = ['components/sass/*.scss']
var coffeeSources = ['components/coffee/tagline.coffee'];

gulp.task('coffee', function(){
	gulp.src('components/coffee/tagline.coffee')
	.pipe(coffee())		
	.pipe(gulp.dest('components/scripts'))	
});

gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'components/sass',
		image: 'builds/development/images',
		styles: 'expanded'
	}))
	.pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['compass']);
});

gulp.task('default', ['coffee','js','compass','watch']);