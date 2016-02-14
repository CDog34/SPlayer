/**
 * Created by caopeter on 16/2/14.
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';

const dirs={
    src:'./src',
    dest:'dest'
};

const es6Path = {
    src:`${dirs.src}/`+'js/*.js',
    dest:`${dirs.dest}`
};
const stylePath={
    src:`${dirs.src}/`+'css/*.scss',
    dest:`${dirs.dest}`
};

gulp.task('styles',()=>{
    return gulp.src(stylePath.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(stylePath.dest));
});

gulp.task('scripts',()=>{
    return gulp.src(es6Path.src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(es6Path.dest));
});

gulp.task('watch',()=>{
    gulp.watch(es6Path.src,['scripts']);
    gulp.watch(stylePath.src,['styles']);
});

gulp.task('dev',['styles','scripts','watch']);