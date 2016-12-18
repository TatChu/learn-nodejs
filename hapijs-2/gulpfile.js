var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('default', function() {
  nodemon({ script : './server.js', ext : ['js', 'html', 'css'] });
});

gulp.task('serve', function() {
  nodemon({ script : './server.js', ext : ['js', 'html', 'css'] });
});