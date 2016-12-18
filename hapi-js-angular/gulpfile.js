// generated on 2016-07-13 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const fileInclude = require('gulp-file-include');
const ngAnnotate = require('gulp-ng-annotate');
const twig = require('gulp-twig');
const shell = require('gulp-shell');
const modRewrite = require('connect-modrewrite');
const deleteLines = require('gulp-delete-lines');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
  .pipe($.sass.sync({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
  .pipe(gulp.dest('.tmp/styles'))
  .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  gulp.src('app/scripts/**/*.js')
  .pipe($.plumber({
    errorHandler: function (error) {
      console.log(error.toString());
      this.emit('end');
    }
  }))
  .pipe(ngAnnotate())
  .pipe(gulp.dest('.tmp/scripts'))
  .pipe(reload({stream: true}));

  return gulp.src('app/modules/**/*.js')
  .pipe($.plumber({
    errorHandler: function (error) {
      console.log(error.toString());
      this.emit('end');
    }
  }))
  .pipe(ngAnnotate())
  .pipe(gulp.dest('.tmp/modules'))
  .pipe(reload({stream: true}));
});

gulp.task('prehtml', function() {
  return gulp.src('app/*.html')
  .pipe($.plumber({
    errorHandler: function (error) {
      console.log(error.toString());
      this.emit('end');
    }
  }))
  .pipe($.fileInclude({
    basepath: 'app/'
  }))
  .pipe(gulp.dest('.tmp/'))
  .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
  .pipe(reload({stream: true, once: true}))
  .pipe($.eslint(options))
  .pipe($.eslint.format())
  .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
  .pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
  .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['prehtml', 'styles', 'scripts', 'images'], () => {
  gulp.src('.tmp/index.html')
  .pipe($.useref({
    searchPath: ['.tmp', 'app', '.']
  }))
  .pipe($.if('*.js', gulpif(argv.min, $.uglify({
    mangle: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    },
    beautify: false
  }))))
  .pipe($.if('*.css', gulpif(argv.min, $.cssnano({
    safe: true,
    autoprefixer: false
  }))))
  .pipe($.if('*.html', gulpif(argv.min, $.htmlmin({
    collapseWhitespace: false
  }))))
  .pipe(gulp.dest('dist'));

  gulp.src('.tmp/*.html')
  .pipe($.useref({
    searchPath: ['.tmp', 'app', '.'],
    noAssets: true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true,
    svgoPlugins: [{cleanupIDs: false}]
  })))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
  .pipe(gulp.dest('.tmp/fonts'))
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  gulp.src([
    'app/scripts/languages.js',
    'app/scripts/variables.js'
    ], {
      dot: true
    }).pipe(gulp.dest('dist/scripts'));

  gulp.src([
    'app/scripts/libs/**/*.*'
    ], {
      dot: true
    }).pipe(gulp.dest('dist/scripts/libs'));

  gulp.src([
    'app/data/**/*.*'
    ], {
      dot: true
    }).pipe(gulp.dest('dist/data'));

  gulp.src([
    'app/modules/**/*.tpl',
    'app/modules/**/*.json'
    ], {
      dot: true
    }).pipe(gulp.dest('dist/modules'));


  return gulp.src([
    'app/*.*',
    '!app/*.html'
    ], {
      dot: true
    }).pipe(gulp.dest('dist'));
});


/////////////////////////////////////
  //  gulp.task('server', function() {
  //   node.src('server/server.js');
  // });


////////////////////////////////////

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['prehtml', 'styles', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9999,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      //middleware: [
        //modRewrite(['!pdf|doc|docx|xls|xlsx|avi|webm|ogg|mp3|mp4|css|less|js|tpl|png|jpg|jpeg|gif|woff|woff2|tff|svg|eot$ /index.html [L]'])
      //]
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
    ]).on('change', reload);

  gulp.watch(['app/*.html', 'app/**/*.tpl'], ['prehtml']);
  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: true,
    port: 9999,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9999,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('test/**/*.js').on('change', reload);
  gulp.watch('test/**/*.js', ['lint:test']);
});

gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
  .pipe(wiredep({
    ignorePath: /^(\.\.\/)+/
  }))
  .pipe(gulp.dest('app/styles'));

  gulp.src(['app/common/script-bundle.tpl', 'app/common/head-bundle.tpl'])
  .pipe(wiredep({
    ignorePath: /^(\.\.\/)*\.\./
  }))
  .pipe(gulp.dest('app/common'));
});

gulp.task('build', ['lint', 'html', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('installAngular', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'bower i angular angular-messages angular-animate angular-cache angular-google-analytics angular-resource angular-sanitize angular-toastr angular-translate angular-ui-router --save\ngulp wiredep',
    ] ))
});

gulp.task('uniAngular', function(){
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'bower uni angular angular-messages angular-animate angular-cache angular-google-analytics angular-resource angular-sanitize angular-toastr angular-translate angular-ui-router react mocha cropper gsap chai is_js --save\ngulp wiredep'
    ]))
    
});
gulp.task('clean:folder', function () {
  return del([
    'backend','resources','test','app/admin','app/**/shared','app/**/account','app/modules/**/*.js'
  ]);
});
gulp.task('remove:scripts', function () {
  gulp.src('app/common/script-bundle.tpl')
   .pipe(deleteLines({
      'filters': [
      /<script\s+src=["']modules/i
      // /<script\s+type=["']text\/javascript["']\s+src=/i
      ]
    }))
  .pipe(gulp.dest('app/common'));
});

gulp.task('templateNormal', ['clean:folder', 'remove:scripts', 'uniAngular']);