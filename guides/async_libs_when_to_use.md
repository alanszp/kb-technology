#When to use each control flow technique

## Callbacks

When the flow is very basic, like only one nested async call.

## Async.js

> async.js is a specific lib, not a technique on it self

When you want to manage a handfull of async calls on a clean way:
  - Avoid **callback nesting** (confusing when reading code).
  - Avoid **error-handling repetition**.

but you don't need any of the following:
  - Call both **sync and async** functions chained.
  - **Register multiple callbacks** to the same function.
  - **Pass the chain** (of async functions) arround between functions.

Why not **just use promises** for this situations?

Promises are somewhat a bigger concept than what Async.js provides, so it's easier to handle async in some cases if the developer is not familiarised with promises.

Why not just use promises, if **I know who to use promises**?

This may be lib specific, but at least on two mayor promises libs (`Q`/`Bluebird`), you are required to **write some boilerplate to handle callback based functions** that you aren't when using async.js- Consider the following:

### [Async](https://github.com/caolan/async)
```javascript
async.series([
  asncFunction1,
  asncFunction2,
  asncFunction3,
  asncFunction4,
  asncFunction5
])
```

### [Q Promises](https://github.com/kriskowal/q)
```javascript
Q.nfcall(asncFunction1)
  .then(Q.nfcall(asncFunction2))
  .then(Q.nfcall(asncFunction3))
  .then(Q.nfcall(asncFunction4))
  .done(Q.nfcall(asncFunction5))
```
> While Async is designed to work with callback based functions, Q works with one of sync functions or promises. It provides utility methods to transform a callback based function into a promise

### [Bluebird Promises](https://github.com/petkaantonov/bluebird)
```javascript
var fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("myfile.json")
  .then(fs.readFileAsync)
  .then(fs.renameAsync)
  .then(fs.readFileAsync)

```

## Promises

Basically, when you want to manage sync and async functions on a chain.