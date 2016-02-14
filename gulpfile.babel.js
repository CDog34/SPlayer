/**
 * Created by caopeter on 16/2/14.
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import connect from 'gulp-connect'
import autoprefix from 'gulp-autoprefixer';

const dirs={
    src:'./src',
    dest:'dest'
};

const htmlPath={
    src:'./demo/**/*.html',
};
const es6Path = {
    src:`${dirs.src}/`+'js/*.js',
    dest:`${dirs.dest}`
};
const stylePath={
    src:`${dirs.src}/`+'css/*.scss',
    dest:`${dirs.dest}`
};

gulp.task('devServer',()=>{
    connect.server({
        root:'.',
        livereload:true
    })
});

gulp.task('html',()=>{
    gulp.src(htmlPath.src)
        .pipe(connect.reload());
})

gulp.task('styles',()=>{
    return gulp.src(stylePath.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefix({
            browsers:['> 5%']
        }))
        .pipe(connect.reload())
        .pipe(gulp.dest(stylePath.dest));
});

gulp.task('scripts',()=>{
    return gulp.src(es6Path.src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(connect.reload())
        .pipe(gulp.dest(es6Path.dest));
});

gulp.task('watch',()=>{
    gulp.watch(htmlPath.src,['html']);
    gulp.watch(es6Path.src,['scripts']);
    gulp.watch(stylePath.src,['styles']);
});

gulp.task('dev',['styles','scripts','devServer','watch']);