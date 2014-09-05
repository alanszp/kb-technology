var karma = require('karma').server;

function runKarmaTask(singleRun) {
  return function(done) {
    var common = require('./karma.common.js');
    common.singleRun = singleRun;
    karma.start(common, done);
  };
}

gulp.task('karma', runKarmaTask(true));