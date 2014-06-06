# Promises
  * [Base Code](#base-code)
  * [Sync or async](#change-to-callback)
    * [What if we must fetch URLs from the web?](#change-to-callback)
    * [Returning a promise](#returning-a-promise)
  * [Parallelization](#from-different-sources)
    * [Fetching from multiple resources](#from-different-sources)
    * [Parallelizating URL fetching using promises](#parallelizating)
  * [Error management](#manage-errors)
    * [What if we manage possible errors from the requests](#manage-errors)
    * [Managing errors with promises](#manage-errors)
  * [Chained Promises](#chained-promises)
    * [Base Code](#base-code)
    * [Cleaning code with promises chains](#cleaning-code-chains)
  * [Using Bluebird insted of Q](#bluebird-vs-q)

## Description
We will try to evince some of the advantages of using promises:

  1. Function implementation can be **sync or async**, without needing to change the code that uses it.
  2. **Parallelization** of requests.
  3. **Error management**

## Example
Fetch some links from URLs and filter them.
## Base Code
```javascript
  function readUrl(url) {
    var d = Q.defer();
    request(url, function(err, resp, body){
      if(err) d.reject(err);
      else d.resolve({ response: resp, body: body });
    });
    return d.promise;
  }

  var linksPromises = getUrls().map(function(url) {
    return readUrl(url).then(function(result) {
      return getLinks(result.body)
    })
  })

  Q.all(linksPromises).done(function(links) {
    return _.filter(isImportantLink)
  })

  function getUrls() {
    return ['http://...', 'http://...']
  }
```
## <a name="change-to-callback"></a> (1) What if we must fetch URLs from the web?
```javascript
  function getUrls(callback) {
    some_lib.fetchUrls(callback)
  }
```
> This would result on us having to **change the code**, because getUrls now expects a callback as argument.

## <a name="returning-a-promise"></a> (1) Returning a promise instead
```javascript
  function getUrls() {
    var d = Q.defer();
    if (sync) {
      d.resolve(['http://...', 'http://...'])
    } else if (async) {
      some_lib.fetchUrls(function(urls) {
        d.resolve(urls)
      })
    }
    return d.promise
  }

  var linksPromises = getUrls().then(function(urls) {
    urls.map(function(url) {
      return readUrl(url).then(function(result) {
        return getLinks(result.body)
      })
    })
  })
```
> Same code, no matter if getUrls is sync or async

## <a name="from-different-sources"></a> (2) What if we must fetch URL from different sources?
```javascript
  function getUrls(callback) {
    facebook_lib.fetchUrls(function(facebook_urls) {
      twitter_lib.fetchUrls(function(twitter_urls) {
        callback(facebook_urls, twitter_urls) // Do something when all URLs are fetched
      })
    })
  }
```
> The issue here is that URL fetching is **secuential**. Thus, the program has to wait for facebook URLs to be fetched before requesting twitter URLs.

## <a name="parallelizating"></a> (2) Parallelizating URL fetching using promises
```javascript
  function getUrls() {
    //Suposing libs return a promise. If not, we can manually make them return a promise
    return Q.all([
      facebook_lib.fetchUrls(),
      twitter_lib.fetchUrls()
    ])
  }
```
>This way we can make the request **in parallel** and, when they are both fulfilled, do something with the response.

## <a name="manage-errors"></a> (3) What if we manage possible errors from the requests
```javascript
  function getUrls(callback) {
    facebook_lib.fetchUrls(function(err, facebook_urls) {
      if (err) return manageError(err)
      twitter_lib.fetchUrls(function(err, twitter_urls) {
        if (err) return manageError(err)
        callback(facebook_urls, twitter_urls)
      })
    })
  }
  function manageError(err) { console.log(err.message) }
```
**Problems:**
  1. **Duplicated** error management logic.
  2. There is no clean way to manage errors **outside** of the function.

## <a name="manage-errors-promises"></a> (3) Managing errors with promises
```javascript
  function getUrls() {
    return Q.all([
      facebook_lib.fetchUrls(),
      twitter_lib.fetchUrls()
    ]).catch(manageError)
  }
```
  Alternatively, we could manage errors outside of getUrls fun
```javascript
  var linksPromises = getUrls()
    .catch(manageError)
    .then(function(urls) {
      urls.map(function(url) {
        return readUrl(url).then(function(result) {
          return getLinks(result.body)
        })
      })
    })
```
# Chained Promises
## Example
Application login.
## Base Code
```javascript
  /* checkPassword has to do some cpu heavy tasks comparing the password 
with the encrypted version, so it is async */
  var login = function(req, res) {
    User.findOne({ email: req.body.email }, function(user){
      if(checkUserExists()) {     
        checkPassword(function success() {
          return addUserToSession()
        }, function fail() {
          return respondWithAuthError()
        })
      } else {
        return respondWithAuthError()
      }
    }, function fail() {
      return respondWithServerError()
    })
  }
```
## <a name="cleaning-code-chains"></a> Cleaning code with promises chains
```javascript
  var login = function(req, res) {
    User.findOne({ email: req.body.email })
      .fail(respondWithServerError)
      .then(checkUserExists)
      .then(checkPassword)
      .then(addUserToSession)
      .then(respondWithUser)
      .fail(respondWithAuthError)
      .done()
  }
```
> Replacing if/else control flow with promise fulfillment/rejection tends to clean up code

# Bluebird vs Q

Basically, there's no good reason to use Q insted of Bluebird. Bluebird has a lot of advantages regarding performance, shorthands methods, error handling, etc. Let's take a look at some of them. If you want more details just go to [Bluebird API Documentation](https://github.com/petkaantonov/bluebird/blob/master/API.md)


## Handle errors on promise rejected

Let's say we have a function `getUrl` that returns a promise that will fullfill with an url. But some errors may occur, such as `EmptyUrlError` or `InvalidUrlError`.

using Q:

```javascript
getUrl()
  .then(doSomethingWithUrl())
  .fail(function(err) {
   if(err instanceOf EmptyUrlError) {
     // handle empty url error
   } else if(err instanceOf InvalidUrlError) {
     // handle invalid url error
   }
  })
  .done()
```

using Bluebird:

```javascript
getUrl()
  .then(doSomethingWithUrl())
  .catch(EmptyUrlError, handleEmptyUrl)
  .catch(InvalidUrlError, handleInvalidUrl)
```
> Note that you don't need to call done at the end of the flow.

or if you don't want to handle them separately but just catch only those errors:
```javascript
getUrl()
  .then(doSomethingWithUrl())
  .catch(EmptyUrlError, InvalidUrlError, handleErrors)
```

More about `.catch` go [here](https://github.com/petkaantonov/bluebird/blob/master/API.md#catchfunction-errorclassfunction-predicate-function-handler---promise)

## Performance

by Tomas Romero: 

Basically, V8 can optimize compiled code if you avoid some specifics patterns in it:

https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

Here we have some benchmark about it:

https://github.com/petkaantonov/bluebird/blob/master/benchmark/stats/latest.md

So, if you need performacne (in time and memory), don't use Q (be aware that this benchmark is done by the creator of bluebird).

## Promisification

Insted of using `ninvoke` to transform a method that receive a node-like callback, to a method that returns a promise, we can use `promisify` or `promisifyAll` to create a new object with all of it's methods promisified.

in Q: 

```javascript
 var fs = require("fs");
 Q.ninvoke(fs, 'readFile', ['myfile.js', 'utf8'])
   .then(doSomething)
```

in Bluebird:

```javascript
  var readFile = Promise.promisify(require("fs").readFile);
  
  readFile("myfile.js", "utf8")
    .then(doSomething)
```

Promisifying the entirely object: `var fs = Promise.promisify(require("fs"))` and every method will return a promise.

More info about promisification [here](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification)

## Lot of awesome shorthands!

Brief quotes about useful shorthand methods:

`.map` / `.filter`

```javascript
Promise.all([UrlPromise1, UrlPromise2, UrlPromise3])
  .map(function(url, index) {
    return { index: index, url: url }
  })
```
> Returns an array of objects like {index:1, url: "someUrl"}

check more functions applied to collections [here](https://github.com/petkaantonov/bluebird/blob/master/API.md#collections)
