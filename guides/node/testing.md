# Testing in node.js

[Mocha](http://visionmedia.github.io/mocha/) is a BDD testing framework, supports both sync and async tests easilly.

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


Want more tools?

* [sinon](sinonjs.org): Mockups, Spies, Stubs.
* [should.js](https://github.com/visionmedia/should.js/): Assertion with BDD style.
* [instanbul](https://github.com/gotwarlost/istanbul): Code coverage for JS.
* [proxyquire](https://github.com/thlorenz/proxyquire): Tool for mocking module dependencies.
