var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');

gulp.task('coffee', function(){
	gulp.src('components/coffee/tagline.coffee')
	.pipe(coffee())		
	.pipe(gulp.dest('components/scripts'));
	
});