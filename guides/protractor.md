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