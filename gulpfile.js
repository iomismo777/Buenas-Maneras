var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');

var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];
var sassSources = ['components/sass/*.scss']
var coffeeSources = ['components/coffee/tagline.coffee'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

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
	.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'components/sass',
		image: 'builds/development/images',
		styles: 'expanded'
	}))
	.pipe(gulp.dest('builds/development/css'))
	.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src(htmlSources)
	.pipe(connect.reload())

});

gulp.task('json', function(){
	gulp.src(jsonSources)
	.pipe(connect.reload())

});

gulp.task('default', ['html','coffee','js','json','compass','connect', 'watch']);