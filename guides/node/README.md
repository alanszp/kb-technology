# Node.js Development Resources

- [Coding Style](#coding-style)
- Guides
  - [Testing in node.js](./testing.md)
- [Mini Guides](#mini-guides)
  - [Development](#development)
  	- [Express 4 changes](#express-4-changes)
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

#### Express 4 Changes

Express 4 will come with new features and improvements. You can see them [here](http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0) and [here](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x#changed) for more detailed information.

The biggest addition/improvement to Express 4 is the new `Router` API. [This](https://github.com/visionmedia/express/wiki/New-features-in-4.x#router) is a good short example of how to use it, and [here](http://expressjs.com/4x/api.html#router) you can see the full documentation if needed.



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

* [nodemon](https://github.com/remy/nodemon): Tool to reload the node server when a file is changed, we install this globally.


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
