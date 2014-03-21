# Scenarios

## Scenario 1. Functions serially
Call 3 functions serially, one after each other. A callback should be call if the sequence ends successfully or with an error.
If an error occurs the sequence should be stopped immediatly.

### Callbacks

```js
var f1 = function (successCbk, errorCbk) {
  
  var r = Math.random();
  
  if (r < 0.9) {
    console.log("f1 executed successfully");
    successCbk();
  } else {
    errorCbk("f1");
  }
}

var f2 = function (successCbk, errorCbk) {
  var r = Math.random();
  
  if (r < 0.9) {
    console.log("f2 executed successfully");
    successCbk();
  } else {
    errorCbk("f2");
  }
}

var f3 = function (successCbk, errorCbk) {
  var r = Math.random();
  
  if (r < 0.9) {
    console.log("f3 executed successfully");
    successCbk();
  } else {
    errorCbk("f3");
  }
}

var errorCbk = function (error) {
  console.log("Error occured in " + error);
}

var successCbk = function () {
  console.log("Sequence executed successfully");
}

f1(function () {
  f2(function () {
    f3(successCbk, errorCbk);
  }, errorCbk);
}, errorCbk);
```
