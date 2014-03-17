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

### Testing Promises
#### Useful libs
* [Chai](https://www.npmjs.org/package/chai)
* [Chai as Promised](https://www.npmjs.org/package/chai-as-promised)

#### Testing function that returns a promise
```javascript
	chai = require('chai')
	chaiAsPromised = require("chai-as-promised")
	should = chai.should()
	it('should find important links', function() {
		var important_links = ['link0', 'linkN']
		linkPromises.should.become(important_links)
	})
```
If we are not using Mocha > 1.18.0, we must manually call done:
```javascript
	it('should find important links', function(done) {
		var important_links = ['link0', 'linkN']
		linkPromises.should.become(important_links).verify(done)
	})
```