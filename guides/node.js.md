# Node.js Development Resources

- [Templates & Examples](#templates--examples)
- [Recommended Modules](#recommended-modules)
	- [Web](#web)
	- [Testing](#testing)
	- [Utility](#utility)
- [Testing](#testing-1)
- [Running](#running)
- [Coding Style](#coding-style)

## Templates & Examples

Browse [templates directory](../templates/node.js/)

## Mini Guides

### Creating a Command Line program

There are two different approaches to creating a command line program: Minimalistic, Complete.

For a minimalistic approach, check [yargs](https://github.com/chevex/yargs/), a fork from [optimist](https://github.com/substack/node-optimist) now unmaintained. It provides a really simple command option parser. Here's an example

```javascript
    #!/usr/bin/env node
    var argv = require('yargs')
        .usage('Usage: $0 -x [num] -y [num]')
        .demand(['x','y'])
        .argv;

    console.log(argv.x / argv.y);
```

For a complete approach, you can use [commander.js](https://github.com/visionmedia/commander.js). It provides not only an option parser, but also support for commands, prompts, and other things. An example:

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```

Other things thay might be of interest:

 * [colors](https://github.com/Marak/colors.js): To add colors to your console.log messages.
 * [node-progress](https://github.com/visionmedia/node-progress) and [node-multimeter](https://github.com/substack/node-multimeter) to implement progress bars on the console.

## Recommended Modules

It's a good practice to browse *popular* modules in [nodejsmodules.org](https://nodejsmodules.org/).

### Web

* **express:** Minimalistic web framework. Sinatra Style. Number one in node.js community
* **socket.io:** Websocket support. Really easy to use
* **jade** Template Language very similar to HAML
* **passport:** Authentication middleware. The 'Device' from node
* **connect-ensure-login** Ensures that a user is logged in ( not for API's )

### Testing

* **mocha:** Testing Framework
* **sinon:** Mockups, Spies, Stubs
* **should.js:** Assertion with BDD style
* **supertest:** Helper to test APIs, fake requests

### Utility

* **lodash:** Utility methods for doing map, filter and a bunch of others things.
* **async:** Utility methods for async processing, queues, jobs, etc.

## Testing

We use `mocha`, with `should.js` and `sinon`.

## Running

## Coding Style

