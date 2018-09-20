const gulp = require('gulp');
const eslint = require('gulp-eslint');
const protractor = require("gulp-protractor").protractor;
const webdriverStandalone = require("gulp-protractor").webdriver_standalone;

const args = require('yargs').argv;
const fs = require('fs-extra');

//Delete downloads dir and create an empty one (It must exists for file export to work)
gulp.task('cleanDownloads', function(){
	let dir = process.cwd() + '/downloads/';
	fs.remove(dir, function(){
		fs.ensureDirSync(dir);
	});
});

gulp.task('lint', [], function(){
    return gulp.src(['./**/*.js', '!./node_modules/**'])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


gulp.task('test',['cleanDownloads'], function(){
	if(!args.suite){
        console.log('Please pass --suite with the specs you\'d like to execute. "--suite all" runs all the suites');
        return;
    }

    let protractorArgs = ['--suite', args.suite];

    if(args.env){
        protractorArgs = protractorArgs.concat(['--params.env=' + args.env]);
    }

    gulp.src(['./**/*-spec.js'])
        .pipe(protractor({
            configFile: './config/protractorConf.js',
            args: protractorArgs,
            autoStartStopServer: true
        }))
        .on('error', function(err){ throw err;});
});

gulp.task('webdriverStandalone', webdriverStandalone);
//use this task lint before testing, usefull for development (esLint causes a failure on Windows machine)
gulp.task('devtest', ['lint', 'test']);

gulp.task('default', ['test']);



