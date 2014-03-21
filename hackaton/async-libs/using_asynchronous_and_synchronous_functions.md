# Managing synchronous and asynchronous functions

## Calling a sequence of asynchronous functions

# [Async](https://github.com/caolan/async) vs [Q Promises](https://github.com/kriskowal/q)

## Calling a sequence of asynchronous functions

### Callbacks

```javascript
asncFunction1(function(err, result) {
  asncFunction2(function(err, result) {
    asncFunction3(function(err, result) {
      asncFunction4(function(err, result) {
        asncFunction5(function(err, result) {
          // do something useful
        })
      })
    })
  })
})
```

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
Q.fcall(Q.nfcall(asncFunction1))
  .then(Q.nfcall(asncFunction2))
  .then(Q.nfcall(asncFunction3))
  .then(Q.nfcall(asncFunction4))
  .done(Q.nfcall(asncFunction5))
```

> While Async is designed to work with callback based functions, Q works with one of sync functions or promises, but it provides utility methods to transform a callback based function into a promise

## Calling a sequence of synchronous and asynchronous functions

### Example
```javascript
asncFunction(function(err, result) {
  sncFunction2()
  asncFunction3(function(err, result) {
    sncFunction4()
    sncFunction5()
  })
})
```

### Q
```javascript
var outputPromise = Q.fcall(asncFunction1)
  .then(sncFunction2)
  .then(Q.fcall(asncFunction3))
  .then(sncFunction4)
  .done(sncFunction5)
```
> Q works with both sync and asynchronous functions.

> If fn returns a value (it is sync), the value is pased as input for the next function on the chain.

> If fn returns a promise, the chain waits for it to be fulfilled and pass the value to next funciton on the chain. Also outputPromise becomes that promise

### Async
> Async only accepts callback-based asynchronous functions

##Making a lib
