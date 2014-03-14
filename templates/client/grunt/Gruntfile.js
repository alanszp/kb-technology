'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var gruntConfig = {};

  var loadCfg = function(cfgName) {
    gruntConfig[cfgName] = require('./grunt_config/' + cfgName + '.js');
  };

  loadCfg('mochaTest');
  loadCfg('karma');
  loadCfg('connect;');
  loadCfg('jshint');
  loadCfg('yeoman');
  loadCfg('clean');
  loadCfg('autoprefixer');
  loadCfg('template');
  loadCfg('rev');
  loadCfg('useminPrepare');
  loadCfg('usemin');
  loadCfg('imagemin');
  loadCfg('svgmin');
  loadCfg('htmlmin');
  loadCfg('ngmin');
  loadCfg('copy');
  loadCfg('concurrent');
  loadCfg('watch');

  grunt.initConfig(gruntConfig);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'template:development',
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:cloud',
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'clean:server'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);


};