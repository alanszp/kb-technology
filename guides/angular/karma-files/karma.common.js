module.exports = {

    basePath: '', // base path, that will be used to resolve files and exclude

    files: [
      '/vendor/....',
      '/javascripts/...',
      '/bower_components/....',
      '/templates/**/*.html'
    ],

    // frameworks to use
    frameworks: ['mocha', 'chai'],

    //preprocessing
    preprocessors: {
     '/templates/**/*.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client',
      moduleName: 'htmls'
    },

    exclude: [], // list of files to exclude
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false
};