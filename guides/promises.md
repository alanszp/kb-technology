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
      .then(checkUserExists)
      .then(checkPassword)
      .then(addUserToSession)
      .then(respondWithUser)
      .fail(respondWithAuthError)
      .done()
  }
```
> Replacing if/else control flow with promise fulfillment/rejection tends to clean up code