'use strict';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    diff = require('gulp-diff'),
    injectSelf = require('./index.js');

var srcDir = 'tests/input',
    dstDir = 'tests/actual',
    expectedDir = 'tests/expected';

gulp.task('clean', function(cb){
    rimraf(dstDir, cb);
});

gulp.task('test-1', function(){
    return gulp.src(srcDir + '/simple-stream.txt')
        .pipe(injectSelf(srcDir + '/dest.txt', /insert here/))
        .pipe(rename('dest1.txt'))
        .pipe(gulp.dest(dstDir));
});

gulp.task('test-2', function(){
    return gulp.src(srcDir + '/simple-stream.txt')
        .pipe(injectSelf(srcDir + '/dest.txt', /insert here/, {
            replaceWith: function(fileContent){
                return '$&\n' + fileContent;
            }
        }))
        .pipe(rename('dest2.txt'))
        .pipe(gulp.dest(dstDir));
});

gulp.task('test-3', function(){
    return gulp.src(srcDir + '/three-line-stream.txt')
        .pipe(injectSelf(srcDir + '/dest.txt', /insert here/, {
            replaceWith: function(fileContent){
                return '\n\n' + fileContent + '\n\n';
            }
        }))
        .pipe(rename('dest3.txt'))
        .pipe(gulp.dest(dstDir));
});

gulp.task('check-results', function(){
    return gulp.src(dstDir + '/*.**')
        .pipe(diff(expectedDir))
        .pipe(diff.reporter({ fail: true }));
});

gulp.task('default', function(cb){
    runSequence('clean', 'test-1', 'test-2', 'test-3', 'check-results', cb);
});