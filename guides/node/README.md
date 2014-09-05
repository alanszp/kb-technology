# Node.js Development Resources

- [Coding Style](#coding-style)
- [Popular Modules](#popular-modules)
- Guides
  - [Testing in node.js](./testing.md)
  - [Web Development](./web_development.md)
  - [Command line programs](./command_line_programs.md)
  - [Memory Management & Profiling](./memory-and-profiling.md)


***

## Coding Style

  We use a [Sublime linter plugin](https://github.com/SublimeLinter/SublimeLinter-jshint) with a [.jshintrc](../templates/node.js/.jshintrc) file also you can check the ECMA 5 features available in node [here](https://github.com/joyent/node/wiki/ECMA-5-Mozilla-Features-Implemented-in-V8)

***

## Popular Modules

First! It's a good practice to browse *popular* modules in [nodejsmodules.org](https://nodejsmodules.org/).


### General

  * [lodash](http://lodash.com/): Utility methods for doing map,
    filter and a bunch of others things.
  * [moment.js](http://momentjs.com/): Parse, validate, manipulate, and display dates in
    javascript.
  * [string.js](http://stringjs.com/): Utility methods for strings (example:
    `startsWith()`, `trim()`, `wrapHTML()`)
  * [request](https://github.com/mikeal/request): Powerful http client with support for
    streams.
  * [winston](https://github.com/flatiron/winston) Very complete logging tool
    with support for different transports, File, Redis, CouchDB, Mongo,
    profiling, logging events.

### Async & Promises

  * [bluebird](https://github.com/petkaantonov/bluebird): To avoid callback hell we use
    promises, these are the best you can get now ;) (previously it was
    [q](https://github.com/kriskowal/q)).
  * [async](https://github.com/caolan/async): Utility methods for async processing, queues,
    jobs, etc. Sometimes it better than use promises.


### Node Streams

  * [event-strem](https://github.com/dominictarr/event-stream) Use it where promises don't
    fit, ie: event processing. Good article
    [here](https://github.com/dominictarr/event-stream)

### API Clients

  * [twit](https://github.com/ttezel/twit): Twitter API client.  
