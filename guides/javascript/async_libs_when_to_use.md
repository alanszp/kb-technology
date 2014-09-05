# When to use each control flow technique

## Callbacks

- When the flow is very basic, like only one nested async call.
- When there is no time to learn any complex control flow.

## Async.js

> async.js is a specific lib, not a technique on it self

When you want to manage a handfull of async calls on a clean way:
  - Avoid **callback nesting** (confusing when reading code).
  - Avoid **error-handling repetition**.

but you don't need any of the following:
  - Call both **sync and async** functions chained.
  - **Register multiple callbacks** to the same function.
  - ~~**Pass the chain** (of async functions) arround between functions.~~ (you can use async.compose to compose a function and pass it arround. This function will receive a callback)

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

## Reactive
It is very useful when you can model your problem as a *stream* of data,
where each value has to be transformed synchronously or asynchronously, and the
input of one transformation depends on the output of another one.

[RxJS](https://github.com/Reactive-Extensions/RxJS) was used to test this async model. One of the library's
pros is that it is well modularised, and each module comes with a battery of transformations that we can
apply on our *stream*. So, we can add only the modules that we need separately.

One of the main cons of this async model, is that in some cases it is hard to model a problem as a
stream with a chain of transformations. And maybe, we can solve the same problem with promises in an easier
way, coding a bit more functionality.

## Streams

When promises are not enough:

  - Incremental procesing of chunks of data (ie: read a file, send data from server to the client)
