# Memory Profiling

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

### Full example

```javascript

var memwatch = require("memwatch");
var fs = require('fs');

var Joel = function () {
 this.j = fs.readFileSync('./spiderwebs.mp3').toString();
}

Joel.prototype.someAction = function() { return "some"; };

var fn = function() {
 var a = new Joel();
 var b = "useless value";
 var c = "Hello, World!";

 function inner() {
   return a;
 }

 return function() {
   return c;
 };
};




var leaks = [];
setInterval(function() { 
 var hd = new memwatch.HeapDiff();
 leaks.push(fn()); 
 var e = hd.end();
 console.dir(e.change.details);
}, 10);
 
```


***

## Heapdump

[heapdump](https://github.com/bnoordhuis/node-heapdump)

``` npm install heapdump ```

### Overview

Lets you take memory snapshots and analyze them using google developer tools

### Might be useful for

* Memory usage forensics

### Snippets time!

```javascript
var heapdump = require("heapdump");

/* Writes a heapdump in the given path*/
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

```

Once the snapshot was saved, go to chrome, open developer tools and go to profiling.

Once there, hover over profiles tab, right click, load profile -> Select the file.

You can load many profiles, and compare them using the compare view below the objects visualization view.


### Gotchas

Use always named constructors for objects in order to make less painful memory profiling.

### Full example

```javascript

var heapdump = require("heapdump");
var fs = require("fs");


var Joel = function () {
  this.j = fs.readFileSync('/home/j/jmeter.tar.gz').toString();
}

Joel.prototype.someAction = function() { return "some"; };


var fn = function() {
 var j = new Joel();
 var b = "useless value";
 var c = "Hello, World!";

 function inner(){
  return j;
 }
 return function() {
   return c;
 };
};


function generateLeak() {
  var leaks = [];
  setInterval(function(){
    leaks.push(fn());
  }, 10);

}


generateLeak();


setInterval(function(){
  heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
  console.log("Heap generated")
}, 1000);
 
```
