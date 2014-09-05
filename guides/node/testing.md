# Testing in node.js

## Index

  - [Introduction](#introduction)
  - [API Testing](#API-testing)


## Introduction

For testing we use the following framework:

* [Mocha](http://visionmedia.github.io/mocha/): Base testing framework.
    - Supports BDD style and others.
    - Supports both sync, async and promises based tests easily.
* [chai](http://chaijs.com/): Assertion library.
    - Support for different testing styles.
    - Can be used in client side and node tests.
    - Lots of plugins
* [sinon](http://sinonjs.org/): Library for spies, stubs and mocks  

Mocha provides the base framework, and chai provides the assertion library. Sinon is not always used, but provides the ability to create stubs & mocks.

Chai has multiple plugins, we recommend:

  * [chai-as-promised](https://github.com/domenic/chai-as-promised/): Chai plugin
    that adds assertions about promises.
  * [chai-datetime](http://chaijs.com/plugins/chai-datetime): Chai plugin with matchers
    for dates.


Other modules that might prove useful:

  * [proxyquire](https://github.com/thlorenz/proxyquire): Tool for mocking module
    dependencies.
  * [supertest](https://github.com/visionmedia/supertest): Library to test http servers
    in node. Provides a fluent API to do requests with expectations.
    (check [API Testing](#API-testing))
  * [instanbul](https://github.com/gotwarlost/istanbul): Code coverage for JS.


## API Testing

For API testing we use [supertest](https://github.com/visionmedia/supertest). It provides a way to make HTTP request, and then make assertions over the response (header, body, status).


### Simple Example

Examples suppose: MongoDb + Mongoose + Passport

Next tests will check the behaviour of a `register` API defined in `routes.js`.

```javascript
  var request = require('supertest');
  var chai = require('chai');
  chai.should();

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

    it('should respond with error if there\'s incomplete parameters ', function(done) {
      request(app)
        .post('/register')
        .send({})
        .expect(400, done)
    })

    afterEach(function(done) {
      Account.remove(done);
    });

  });
```

In order to clean specific collections between tests, we didn't find any helper to do it. So we do it manually in `afterEach` / `beforeEach` hooks.

### Authenticated Requests

Supertest gives us an `agent` object in order to handle cookies or sessions within requests. For more detailed examples check [this](https://github.com/visionmedia/supertest#example).

Suppose that we have a `login` api. Tests would be like:

```javascript
  // ... use previous configuration and requires ...

  app.use(express.cookieParser());



  describe('POST /login', function() {
    // we create an agent. The agent will store cookies
    var agent;

    beforeEach(function(done) {
      Account.register(new Account({ username : "test" }), "test", done);
    });  

    beforeEach(function() {
      // we create an agent. The agent will store cookies
      // we probably don't want to share the http session between tests
      // that's why we create a new agent each time.
      agent = request.agent(app);
    });

    it('should login properly with valid credentials', function(done) {
      // we now use agent instead of request
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
```

So, at this point we may want to test authenticated requests. Let's say that we want to get all the accounts in the app.

The request should respond with an array containing all the users. But in order to make this request properly, we should be logged in. Let's use agent for this, logging in a test user previously.

```javascript
  // ... use previous configuration, requires & beforeEach / afterEach hooks ...

  describe('GET /accounts', function(){
    var agent;

    beforeEach(function() {
      // we create an agent. The agent will store cookies
      // we probably don't want to share the http session between tests
      // that's why we create a new agent each time.
      agent = request.agent(app);
    });


    /** Provides a "logged context" in which the cb will execute */
    function login(user, cb) {
          agent.post('/login').send(user).end(cb)
      }

    it('respond with all acounts when user is authenticated', function(done){
      // note the use of login().
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
```
