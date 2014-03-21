# Node cluster

See [node-cluster doc](http://nodejs.org/api/cluster.html) for an overview

The cluster module allows you to easily create child processes that all share server ports.

On Windows, it is not yet possible to set up a named pipe server in a worker.


### Snippets used for heroku

```
git init
heroku create
```

index.js
```javascript

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log(numCPUs);

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  http.createServer(function(req, res) {
    setTimeout(function(){
      res.writeHead(200);
      res.end("hello world from " + process.pid +  "\n");
    }, 100);
  }).listen(process.env.PORT || 8000);
}


```

Procfile

```
web: node index.js
```


```
git push heroku master
```

Heroku supports cluster out-of-the-box but there are considerations to take in count.

[The dynos have a number of cpus fluctuating between different ranges for different dyno types](https://devcenter.heroku.com/articles/dyno-size)




### Nodejitsu

We could not find a single thread that assures cluster is supported.

However, in their FAQ section, they really encourage to use their scaling system instead of cluster.

There should be a test app and deploy in order to test the hypotesis of cluster working in nodejitsu.






