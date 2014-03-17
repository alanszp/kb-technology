## Creating and using a Promise
### Wrap a callback style request into a promise
```javascript
	/*Read the html body from an URL */
	function readUrl(url) {
  	var d = Q.defer();
	  request(url, function(err, resp, body){
	    if(err) d.reject(err);
	    else d.resolve({ response: resp, body: body });
	  });
	  return d.promise;
	}
```
### Generate an array of promises
```javascript
	var linksPromises = getUrls().map(function(url) {
  	return readUrl(url).then(function(result) {
    	return getLinks(result.body);
	  });
	});
```
### Decide what to do after array of promises have been resolved
```javascript
	Q.all(linksPromises).done(function(links) {
  	return _.filter(isImportantLink);
	});
```

#### Dummy functions used in the code below
```javascript
	/*A bunch of urls to scrap */
	function getUrls() {
	  return ['http://...', 'http://...'];
	}

	/* Get links from the body */
	function getLinks(body) { //some criteria }

	/*Defines is a link is important */
	function isImportantLink(link) {
  	//some criteria
	}

	/*Defines is a link is important */
	function isImportantLink(link) { //some criteria }
```

