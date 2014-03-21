# Memory Profiling

## The problem

My memory usage patterns are unacceptable (Lots of gc, lots of memory).

In order to see some examples and deeper explanation, go to [this link](http://stackoverflow.com/questions/5326300/garbage-collection-with-node-js)


## The tools

There are a few tools used to profile node applications. Just to say some: nodetime, look, node-heapdump, usage, memwatch, etc.

All of them are used as modules which must be required inside the app.

***
## Usage.js

[usage.js](https://github.com/arunoda/node-usage)

``` npm install usage ```

### Overview

Super simple module just to watch in a simple straight-forward way the cpu and memory consumption.

Works on Heroku and Nodejitsu.

### Might be useful for

* Triggering actions on cpu or memory thresholds (Scaling, notifying, etc)
* Monitoring cpu and memory usage in platforms where monitoring is paid

### Snippets time!

```javascript
var usage = require("usage");

var pid = process.pid // you can use any valid PID instead

usage.lookup(pid, function(err, result) {
  console.log(result);
});

```

The result is an object of form:

```javascript
{
    cpu: 10.6, //in percentage
    memory: 100065280 //in no of bytes
}

```

### Gotchas

If you call ``` usage.lookup() ``` continuously for a given pid, you can turn on keepHistory flag and you'll get the CPU usage since last time you track the usage. This reflects the current CPU usage.

```javascript

var options = { keepHistory: true }

usage.lookup(pid, options, f);

usage.clearHistory(pid); //clear history for the given pid
usage.clearHistory(); //clean history for all pids

```

***

## Memwatch

[memwatch](https://github.com/lloyd/node-memwatch)

``` npm install memwatch ```

### Overview

Module that lets you sneak over gc stats and exposes a "leak" event to take actions.

### Might be useful for

* Triggering actions on memory leaks
* Monitoring memory usage in platforms where monitoring is paid (combined with logging)

### Snippets time!

```javascript
var memwatch = require("memwatch");

memwatch.on('leak', function(info) {
 console.log(info);
});

memwatch.on('stats', function(info) {
 console.log(info);
});


var fn = function() {
 var a = fs.readFileSync('./reallyBigFile.mkv').toString();
 var b = "useless value";
 var c = "Hello, World!";
 
 function inner(){
  return a;
 }

 return function() {
   return c;
 };
};

var leaks = [];

setInterval(function(){
  leaks.push(fn());
}, 100);


```

You can also use a HeapDiff to research the new allocations:

```javascript
var hd = new memwatch.HeapDiff();

// do some things ...

var diff = hd.end();

diff.before // t0 snapshot
diff.after // t1 snapshot
diff.change.details // Allocations and free's by object type

```



### Gotchas

In order to make your debugging experience less painful, use constructors to create objects to see them listed in the diff.change.details by constructor name


***
