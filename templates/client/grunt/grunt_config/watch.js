// Watches files for changes and runs tasks based on the changed files
module.exports = {
  js: {
    files: ['{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js'],
    tasks: ['newer:jshint:all']
  },
  jsTest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['newer:jshint:test', 'karma']
  },
  mocha: {
    files: ['src/{,*/}*.js', 'test/{,*/}*.js'],
    tasks: ['mochaTest']
  },
  styles: {
    files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
    tasks: ['newer:copy:styles', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files: [
      '<%= yeoman.app %>/{,*/}*.html',
      '.tmp/styles/{,*/}*.css',
      '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  }
};