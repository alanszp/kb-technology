
/*Read the html body from an URL */
function readUrl(url) {
  var d = Q.defer();
  request(url, function(err, resp, body){
    if(err) d.reject(err);
    else d.resolve({ response: resp, body: body });
  });
  return d.promise;
}

/*A bunch of urls to scrap */
function getUrls() {
  return ['http://...', 'http://...'];
}

/* Get links from the body */
function getLinks(body) {
  $ = cheerio.load(body);
  var links = $('a'); //jquery get all hyperlinks
  $(links).map(function(link){
    return $(link).attr('href');
  });
}

/*Defines is a link is important */
function isImportantLink(link) {
  //some criteria
}


var linksPromises = getUrls().map(function(url) {
  return readUrl(url).then(function(result) {
    return getLinks(result.body);
  });
});

Q.all(linksPromises).done(function(links) {
  return _.filter(isImportantLink);
});