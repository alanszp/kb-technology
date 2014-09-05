##Mocha and Karma


We can use karma from the console or as a gulp task, this configuration example supports both.

  - npm install -g karma (install karma as global program)
  - Shared configuration between global and gulp [karma.common.js](./karma-files/karma.common.js)
  - Conf file for karma from console ( uses karma.common.js ): [karma.conf.js](./karma-files/karma.conf.js)
  - Gulpfile [gulpfile.js](./karma-files/gulpfile.js)

Now we can run karma start to do TDD and we can use gulp karma to run our client test once for our Travis builds.


### ng-html2js

This preprocessor will load the html templates ( directives, views, ng-includes, etc) into the $templateCache angular service
because angular does not allow to make Ajax request in our unit tests.

````
    preprocessors: {
     '/templates/**/*.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client',
      moduleName: 'htmls'
    },
````

**stripPrefix** would allow us to avoid problems where we reference our templates like this "/templates/some.html" in our directives, but we load them
in our karma file like this "client/templates/some.html".

**moduleName** is the name angular will use to load this module in our tests.


Since Angular won't allow us make any ajax request, all requests must be mocked, here is an example for a mock helper, Angular will load our app
and then our "mocks" module, if any service, directive, controller is defined again is our "mocks" module it will be used, since the last definition wins this allow us
to use DI in our test with mocked objects.

````javascript


  var mocks = angular.module('mocks', []);

  mocks.service('$helpers', function($rootScope, $compile, $controller, $httpBackend) {

    this.newScope = function() {
      return $rootScope.$new();
    };

    this.newDirective = function(template) {
      var element = $compile(template)($rootScope);
      return element;
    };

    this.newController = function(controllerName, dependencies) {
      return $controller(controllerName, dependencies);
    };

    this.digest = function() {
      $rootScope.$digest();
    };

    // someEndPoint -> a string representing the url, example '/api/someEndPoint'
    this.mockApiCall = function(someEndPoint, someData) {
      $httpBackend.whenGET(someEndPoint).respond(someData);
    };


  });


````

Using mocks

````javascript

  /*jshint expr: true*/
  describe('feature', function() {
      var someService = null;

      beforeEach(module('yourapp'));
      beforeEach(module('mocks')); //load the mocks
      beforeEach(module('htmls')); //loads the templates into the cache.

      //angular allows us to inject services with _service_ and use cool variables names in our tests.
      beforeEach(inject(function(_someService_, _$helpers_ /*load our helper service*/) {
        someService = _someService_;
        $helpers.mockApiCall('/api/user', {user: 'someUser'}); //mock API
      }));


      describe('some scenario', function() {

        it('should something', function(done) {
          done(); //async test
        });

      });

  });


````



##Protractor

Just think of it as a karma runner (`karma`) for end-to-end (E2E) tests.

### First of all: Why should I use a test runner anyway?

Ever tested on the browser **without karma**?

Well, after defining your tests using the test framework of choice (mocha, jasmine, etc.) **it implies**:
  - Defining a index-test.html where you make all the **script imports** of the tests and de .js you want to test (**no regEx, no wildcards, no directories***)
  - **Starting** -lets say- **jasmine server**
  - **Manually opening the browser** upon which you want to test you code against
  - Writing (well, copy-pasting) the url of jasmine server on the address bar
  - Watch the **results on the browser**

#### Limitations?

Work that should be done by a machine is **done by a human**:
  - You have to open/close **every browser you want to test**.
  - Manually start the test framework server.
  - After changing code, **manually run the tests again**.
  - If you need to tests a new js file, you have to **manually add it to de index-test.html**

Besides, you **can't watch the test results on your terminal**, only on the browser (at least by default)

#### How does karma/protractor solves this?

- You **configure all the browsers*** you want your tests to be runned. The test runner will open all of them and perfom the tests.
- You can **define files/directories to include or exclude**.
- You can configure **autowatch** (only in the case of karma) and see your tests run on every code change.

This are the main advantages of using a test runner. Besides they provide some features that can be replaced using task runners (ie: Grunt, Gulp). They come as plugins, for example:

  - compile coffescript on code change
  - preload $templateCache

### Why should we use Protractor instead of karma (for E2E tests)?

`Karma` official docs <a href="https://karma-runner.github.io/0.10/intro/faq.html" target="_blank">recommends using `protractor` instead of `karma-ng-scenario`</a>.

- Protractor provides some **commands to easily install selenium and chromedriver**
- Protractor is built on **Selenium's WebDriver**, which is a standardized API to interact with browsers
- Protractor is built on top of the **jasmine framework**
- Protractor **needs a Selenium server*** up and running (**unless** we only want to run our tests against chrome using **ChromeDriver**)
- Protractor automatically adds a `browser` variable that is a **wrapper for the WebDriver API**. The browser variables comes with some **handy methods**, like `browser.debugger()`, which will pause the test execution on a given point to allow inspections on the actual browser's console
- It gives you the ability to **run js scripts on the browser**
- It's API is **built upon promises**, so testing the asynchronous is simple.

### How does a Protrator spec flow looks like?

Protractor makes calls through the WebDriver API (wrapped inside the browser variable), that hit the selenium server, which controls the browser under test and make the magic happen

### How do Protractor automatically handles the asynchronic nature of browser interactions on tests?

**All WebDriver API calls** (and thus, protractor calls) **return promises** instead of actual values.

An important point to understand is that although **protractor can be configured to be used with mocha**, by default it uses a **modified version of jasmine**. It modifies jasmine's `expect` method to perform assertions only after WebDriver promises have fullfilled, so the developer doesn't have to worry about calling `done()`. Thats why if you take some sample spec from the web defined using default modified jasmine and you **change to mocha**, you will have to **handle asynchronicity yourself** (ie: by using chai-as-promised).

### Recommendations when using Protractor

- Use the <a href="https://github.com/angular/protractor/blob/master/docs/getting-started.md#organizing-real-tests-page-objects" target="_blank">Page Objects</a> pattern
- Use default jasmine implementation, or <a href="https://github.com/angular/protractor/blob/master/docs/using-mocha.md" target="_blank"> mocha with chai-as-promised</a>


Recommended articles:
  - <a href="http://www.ng-newsletter.com/posts/practical-protractor.html" target="_blank">NG-NEWSLETTER Practical Protractor</a>.
  - <a href="https://github.com/angular/protractor/blob/master/docs/getting-started.md" target="_blank">Official Protractor Getting Started Guide</a>.