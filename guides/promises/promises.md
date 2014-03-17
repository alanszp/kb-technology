# Promises 1
We will try to evince some of the advantages of using promises:

  1. Function implementation can be **sync or async**, without needing to change the code that uses it.
  2. **Parallelization** of requests.
  3. **Error Management**

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
## (1) What if we should fetch URLs from the web?
```javascript
  function getUrls(callback) {
    some_lib.fetchUrls(callback)
  }
```
> This would result on us having to **change the code**, because getUrls now expects a callback as argument.

## (1) Returning a promise instead
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

## (2) What if we should fetch URL from different sources?
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

## (2) Parallelizating URL fetching using promises
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

## (3) What if we manage possible errors from the requests
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

## (3) Managing errors with promises
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

