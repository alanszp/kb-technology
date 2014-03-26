# Node.js Development Resources

- [Coding Style](#coding-style)
- [Mini Guides](#mini-guides)
        - [Development](#development)
	- [Testing](#testing)
	- [Authentication](#authentication)
	- [Upload Files & Manipulate Images](#upload-files--manipulate-images)
	- [Security](#security)
	- [Running](#running)
	- [Profiling](#profiling)
	

First! It's a good practice to browse *popular* modules in [nodejsmodules.org](https://nodejsmodules.org/).

	
## Coding Style

  We follow AirBnb [coding style](https://github.com/airbnb/javascript)
  
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

### Authentication  

  We use [passport](http://passportjs.org/) as authentication middleware, OAuth, OAuth 2, Google, Facebook, Twitter, local with Mongo ( Can also be used with Postgresql but there's no default node module for that )

* [connect-ensure-login](https://github.com/jaredhanson/connect-ensure-login): Ensures that a user is logged in ( not for API's )

### Upload files and Manipulate Images

//TODO upload

* [cloudinary](https://github.com/cloudinary/cloudinary_npm): Upload images to cloudinary.
* [gm](http://aheckmann.github.io/gm/): A module to manipulate images with RMagick, ImageMagick, etc. ( on Heroku force to use ImageMagick see [here](http://stackoverflow.com/questions/16476666/image-resize-library-for-node-js-site-on-heroku-hosting) )


### Security

  Basic security concerns https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications
  
### Utilities

* [lodash](http://lodash.com/): Utility methods for doing map, filter and a bunch of others things.
* [q](https://github.com/kriskowal/q): To avoid callback hell we use promises, these are the best you can get now ;)
* [async](https://github.com/caolan/async): Utility methods for async processing, queues, jobs, etc, use it where promises don't fit, ie: event processing.
* [event-strem](https://github.com/dominictarr/event-stream) Use it where promises don't fit, ie: event processing. Good article [here](https://github.com/dominictarr/event-stream)
* [request](https://github.com/mikeal/request): Powerful http client with support for streams.
* [twit](https://github.com/ttezel/twit): Twitter API client.  
* [winston](https://github.com/flatiron/winston) Very complete logging tool with support for different transports, File, Redis, CouchDB, Mongo, profiling, logging events.


### Running

* [supervisor](https://github.com/isaacs/node-supervisor): Tool to reload the node server when a file is changed, we install this globally.


### Profiling

The use of closures can lead to memory leaks so we may need to profile our application to find them.
Some memory usage patterns are unacceptable (Lots of gc, lots of memory).

In order to see some examples and deeper explanation, go to [this link](http://stackoverflow.com/questions/5326300/garbage-collection-with-node-js), finally check [this tools](./node-profiling.md) to get the job done ;)
