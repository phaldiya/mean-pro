'use strict';

var _ = require('lodash');
var appRoot = require('app-root-path');
var gulp = require('gulp');
var del = require('del');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var protractor = require('gulp-angular-protractor');

var jasmine = require('gulp-jasmine');
var SpecReporter = require('jasmine-spec-reporter');

var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

var e2eSourceFiles = require("./test/e2e/config/protractor.conf").config.specs;

var SITE_URL_TEMPLATE = 'http://localhost:${PORT}';
var MONGODB_TEMPLATE = 'mongodb://localhost:${MONGODB_PORT}/${DB_NAME}';
var dbName = require(appRoot + '/config/app-config').dbName;

var integrationSourceFiles = [
  appRoot + '/test/resources/data/_dbinit.js',
  appRoot + '/test/integration/**/*.integration.js'
];

var KarmaServer = require('karma').Server;
var karmaConfig = require('./test/spec/client/config/karma.conf');
var spawnMongod;
var spawnExpress;
var protractorConfig;

gulp.task('lint', function() {
    return gulp.src(['./public/scripts/**/*.js',
        '!./public/scripts/main.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy', ['clean'], function () {
    gulp.src(['bower_components/angular/angular.*',
        'bower_components/angular-resource/angular-resource.*',
        'bower_components/angular-route/angular-route.*',
        'bower_components/angular-animate/angular-animate.*',
        'bower_components/angular-messages/angular-messages.*',
        'bower_components/angular-cookies/angular-cookies.*',
        'bower_components/angular-touch/angular-touch.*',
        'bower_components/angular-aria/angular-aria.*',
        'bower_components/angular-sanitize/angular-sanitize.*',
        'bower_components/angulartics/dist/angulartics.min.js',
        'bower_components/angulartics/dist/angulartics-ga.min.js',
        'bower_components/lodash/lodash.js',
        'bower_components/lodash/lodash.min.js',
        'bower_components/momentjs/moment.js',
        'bower_components/momentjs/min/moment.min.js',
        'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-*.js'])
        .pipe(gulp.dest('./public/lib/'));

    //bootstrap fonts
    gulp.src('bower_components/bootstrap-sass/assets/fonts/**')
        .pipe(gulp.dest('./public/fonts/'));

    //bootstrap styles
    gulp.src('bower_components/bootstrap-sass/assets/stylesheets/bootstrap/**')
        .pipe(gulp.dest('./public/css/bootstrap/'));
});

gulp.task('clean', function (cb) {
    return del(['/css/project.css'], cb);
});

gulp.task('sass', [], function() {
    gulp.src(['./public/css/*.scss'])
        .pipe(sass())
        .pipe(rename('project.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('test:e2e:firefox', [], function (done) {
  setupEnv({PORT:4001, MONGODB_PORT: 28001});
  setupProtractorConfig('firefox');

  runSequence('lint', 'process:startup', 'e2e:runner', 'process:shutdown');
});

gulp.task('test:e2e:chrome', [], function (done) {
  setupEnv({PORT:4002, MONGODB_PORT: 28002});
  setupProtractorConfig('chrome');

  runSequence('lint', 'process:startup', 'e2e:runner', 'process:shutdown');
});

gulp.task('test:e2e:phantomjs', [], function (done) {
  setupEnv({PORT:4003, MONGODB_PORT: 28003});
  setupProtractorConfig('phantomjs');

  runSequence('lint', 'process:startup', 'e2e:runner', 'process:shutdown');
});

gulp.task('test:integration', [], function() {
  setupEnv({PORT:5001, MONGODB_PORT: 29001});

  runSequence('lint', 'process:startup', 'integration:runner', 'process:shutdown');
});

gulp.task('spec:client', ['lint'], function(done) {
  karmaConfig.singleRun = true;
  var server = new KarmaServer(karmaConfig, done);
  server.start();
});

gulp.task('watch', function() {
    gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('default', ['watch'], function() {

});

gulp.task('process:startup', [], function(cb) {
  spawnMongod = spawn('mongod', ['--port', process.env.MONGODB_PORT, '--storageEngine', 'inMemoryExperiment', '--dbpath', './']);
  spawnExpress = spawn('node', ['server.js'], {env:
  { PATH: process.env.PATH,
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    SITE_URL: process.env.SITE_URL,
    DISPLAY_COUNT: process.env.DISPLAY_COUNT
  }
  });
  //spawnMongod.stdout.pipe(process.stdout);
  //spawnExpress.stdout.pipe(process.stdout);

  var first = true;
  spawnExpress.stdout.on('data', function(data) {
    if (first) {
      first = false;
      cb();
    }
  });
});

gulp.task('process:shutdown', [], function() {
  spawnMongod.kill('SIGINT');
  spawnExpress.kill('SIGINT');
});

gulp.task('e2e:runner', [], function() {
  return gulp.src(e2eSourceFiles)
    .pipe(protractor(protractorConfig)).on('error', function() {
      runSequence('process:shutdown');
    });
});

gulp.task('integration:runner', [], function (done) {
  return gulp.src(integrationSourceFiles)
    .pipe(jasmine({
      reporter: new SpecReporter({displayStacktrace: 'summary', displayFailuresSummary: true})
    })).on('error', function() {
      runSequence('process:shutdown');
    });
  //.pipe(protractor(integrationHelper.getConfig(ENVIRONMENT_TYPE.LOCAL, BROWSER_TYPE.PHANTOMJS, ['--capabilities.phantomjs.binary.path', require('phantomjs').path])));
});

function setupEnv(configs) {
  for (var prop in configs) {
    process.env[prop] = configs[prop];
  }

  process.env.NODE_ENV = 'test';

  if (process.env.DB_NAME === undefined) {
    process.env.DB_NAME = dbName;
  }

  if (process.env.SITE_URL === undefined) {
    process.env.SITE_URL = _.template(SITE_URL_TEMPLATE)({PORT: process.env.PORT});
  }

  if (process.env.DB_NAME === undefined) {
    process.env.DB_NAME = dbName;
  }

  if (process.env.MONGODB === undefined) {
    process.env.MONGODB = _.template(MONGODB_TEMPLATE)({MONGODB_PORT: process.env.MONGODB_PORT, DB_NAME: process.env.DB_NAME});
  }
}


function setupProtractorConfig(browserName) {
  protractorConfig = {
    configFile: "./test/e2e/config/protractor.conf.js",
    args: ['--capabilities.browserName', (browserName || 'chrome').toLowerCase(), '--baseUrl', process.env.SITE_URL],
    autoStartStopServer: false,
    debug: true
  };

  if (browserName === 'phantomjs') {
    protractorConfig.args.push('--capabilities.phantomjs.binary.path');
    protractorConfig.args.push(require('phantomjs').path);
  }
}
