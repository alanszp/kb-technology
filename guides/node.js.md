# Node.js Development Resources

- [Coding Style](#coding-style)
- [Mini Guides](#mini-guides)
    - [Development](#development)
    - [Testing](#testing)
    	- [API Testing with Supertest](#api-testing-with-supertest)
    - [Authentication](#authentication)
    - [Upload Files & Manipulate Images](#upload-files-and-manipulate-images)
    - [Security](#security)
    - [Running](#running)
    - [Profiling](#profiling)
	

First! It's a good practice to browse *popular* modules in [nodejsmodules.org](https://nodejsmodules.org/).

	
## Coding Style

  We use a [Sublime linter plugin](https://github.com/SublimeLinter/SublimeLinter-jshint) with a [.jshintrc](../templates/node.js/.jshintrc) file also you can check the ECMA 5 features available in node [here](https://github.com/joyent/node/wiki/ECMA-5-Mozilla-Features-Implemented-in-V8)
  
## Mini Guides  

### Development

  We build applications with [Express](http://expressjs.com/), is simple, minimalistic, it has support for API's and templating, web use [Jade](http://jade-lang.com/) for templates.

### Testing

[Mocha](http://visionmedia.github.io/mocha/) is a BDD testing framework, supports both sync and async tests easilly.

* [sinon](sinonjs.org): Mockups, Spies, Stubs.
* [should.js](https://github.com/visionmedia/should.js/): Assertion with BDD style.
* [supertest](https://github.com/visionmedia/supertest): Helper to test APIs, fake requests, it loads the app to allow send request to it and make assertions.
* [instanbul](https://github.com/gotwarlost/istanbul): Code coverage for JS.
* [proxyquire](https://github.com/thlorenz/proxyquire): Tool for mocking module dependencies.

#### API Testing with Supertest:

Examples suppose: MongoDb + Mongoose + Passport

Next tests will check the behaviour of a `register` API defined in `routes.js`.

	var request = require('supertest');
	var should = require('should');
	var express = require('express');
	var routes = require('./routes');
	var app = express();
	
	// We create a fresh express app and use routes module to define routes
	routes(app);
	
	describe('POST /register', function() {
	
	  it('should create a new user', function(done) {
	    request(app)
	      .post('/register')
	      .send({username: "test_register", password: "test_register"})
	      .expect(201)
	      .expect(function (res) {
	        res.body.should.have.property("username")
	        res.body.username.should.be.equal("test_register")
	        // we really want to check this.
	        res.body.should.not.have.property("password")
	      })
	      .end(done)
	  })
	
	  it('should respond with error if there's incomplete parameters ', function(done) {
	    request(app)
	      .post('/register')
	      .send({})
	      .expect(400, done)
	  })
	
	  afterEach(function(done) {
	    Account.remove(done);
	  });
	
	});
	
In order to clean specific collections between tests, we didn't find any helper to do it. So we do it manually in `afterEach` / `beforeEach` hooks.

##### Handling logins and authenticated requests

Supertest gives us an `agent` object in order to handle cookies or sessions within requests. For more detailed examples check [this](https://github.com/visionmedia/supertest#example). 
Suppose that we have a `login` api. Tests would be like:

	... use previoues configuration and requires ...
	
	app.use(express.cookieParser());
	var agent = request.agent(app);
	
	describe('POST /login', function() {
	  beforeEach(function(done) {
	    Account.register(new Account({ username : "test" }), "test", done);
	  });  
	
	  it('should login properly with valid credentials', function(done) {
	    agent
	      .post('/login')
	      .send({ username: 'test', password: 'test' })
	      .expect(204, done);
	  });
	
	  it('should reject login with invalid credentials', function(done) {
	    agent
	      .post('/login')
	      .send({ username: 'test', password: 'asdasd' })
	      .expect(401, done);
	  });
	
	  afterEach(function(done) {
	    Account.remove(function() {
	      agent.del('/logout').end(done);
	    });
	  });  
	})
	
So, at this point we may want to test authenticated requests. Let's say that we want to get all the accounts in the app.
The request should respond with an array containing all the users. But in order to make this request properly, we should be logged in. Let's use agent for this, logging in a test user previously.

	... use previous configuration, requires & beforeEach / afterEach hooks ...

	describe('GET /accounts', function(){
	  function login(user, cb) {
    	    agent.post('/login').send(user).end(cb)
  	  }
  	  
	  it('respond with all acounts when user is authenticated', function(done){
	    login({username: "test", password: "test"},function() {
	      agent.get('/accounts')
	        .set('Accept', 'application/json')
	        .expect(function(res) {
	          res.body.should.be.an.Array;
	          res.body[0].should.have.property('username');
	          res.body[0].should.not.have.property('password');
	        })
	        .expect(200, done);
	    })
	  });
	
	  it('respond unauthorized if user is not authenticated', function(done){
	    login({username: "test", password:"asdasd"}, function() {
	      agent.get('/accounts')
	        .set('Accept', 'application/json')
	        .expect(403, done);
	    })
	  });
	})
	
That's all!

### Authentication  

  We use [passport](http://passportjs.org/) as authentication middleware, OAuth, OAuth 2, Google, Facebook, Twitter, local with Mongo ( Can also be used with Postgresql but there's no default node module for that )

* [connect-ensure-login](https://github.com/jaredhanson/connect-ensure-login): Ensures that a user is logged in ( not for API's )

### Upload files and Manipulate Images

//TODO upload

* [cloudinary](https://github.com/cloudinary/cloudinary_npm): Upload images to cloudinary.
* [gm](http://aheckmann.github.io/gm/): A module to manipulate images with RMagick, ImageMagick, etc. ( on Heroku force to use ImageMagick see [here](http://stackoverflow.com/questions/16476666/image-resize-library-for-node-js-site-on-heroku-hosting) )


### Security

  Basic security concerns https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications
  

### Running

* [supervisor](https://github.com/isaacs/node-supervisor): Tool to reload the node server when a file is changed, we install this globally.


### Profiling

The use of closures can lead to memory leaks so we may need to profile our application to find them.
Some memory usage patterns are unacceptable (Lots of gc, lots of memory).

In order to see some examples and deeper explanation, go to [this link](http://stackoverflow.com/questions/5326300/garbage-collection-with-node-js), finally check [this tools](./node-profiling.md) to get the job done ;)

***

//FIND A BETTER WAY TO SHOW THIS UTILITIES

### Utilities

* [lodash](http://lodash.com/): Utility methods for doing map, filter and a bunch of others things.
* [q](https://github.com/kriskowal/q): To avoid callback hell we use promises, these are the best you can get now ;)
* [async](https://github.com/caolan/async): Utility methods for async processing, queues, jobs, etc, use it where promises don't fit, ie: event processing.
* [event-strem](https://github.com/dominictarr/event-stream) Use it where promises don't fit, ie: event processing. Good article [here](https://github.com/dominictarr/event-stream)
* [request](https://github.com/mikeal/request): Powerful http client with support for streams.
* [twit](https://github.com/ttezel/twit): Twitter API client.  
* [winston](https://github.com/flatiron/winston) Very complete logging tool with support for different transports, File, Redis, CouchDB, Mongo, profiling, logging events.
