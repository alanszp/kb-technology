// Empties folders to start fresh
module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= yeoman.dist %>'
      ]
    }]
  },
  cloud: {
    files: [{
      dot: true,
      src: [
        'config'
      ]
    }]
  },
  server: '.tmp'
};