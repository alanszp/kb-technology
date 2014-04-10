var Q = require('q');

/**
fetchTweet: simulates a GET to obtain a tweet. It has a 1% of error probability.
**/
var fetchTweet = function (tweetNumber) {
  var deferred = Q.defer();
  setTimeout(function (tweetNumber) {
    var r = Math.random();
    if (r < 0.99) {
      deferred.resolve("Tweet " + tweetNumber);
    } else {
      deferred.reject(new Error("Fetch tweet error"));
    }
  }, Math.random() * 5000, tweetNumber);
  return deferred.promise;
};

/**
downloadAvatar: simulates the download of the author's avatar of the tweet, with 1% error probability.
**/
var downloadAvatar = function (tweet) {
  var deferred = Q.defer();
  setTimeout(function (tweet) {
    var r = Math.random();
    if (r < 0.99) {
      deferred.resolve(tweet + " + Avatar");
    } else {
      deferred.reject(new Error("Avatar download error"));
    }
  }, Math.random() * 5000, tweet);
  return deferred.promise;
};

/**
uploadTweet: simulates the tweet upload, with 1% error probability.
**/
var uploadTweet = function (tweetWithAvatar) {
  var deferred = Q.defer();
  setTimeout(function (tweetWithAvatar) {
    var r = Math.random();
    if (r < 0.99) {
      deferred.resolve(tweetWithAvatar + " + uploaded");
    } else {
      deferred.reject(new Error("Tweet upload error"));
    }
  }, Math.random() * 5000, tweetWithAvatar);
  return deferred.promise;
};

(function processTweets() {
  for (var i = 0; i < 100; i++) {
    fetchTweet(i + 1)
    .then(function (tweet) {
      return downloadAvatar(tweet);
    })
    .then(function (tweetWithAvatar) {
      return uploadTweet(tweetWithAvatar);
    }).then(function (uploadedTweet) {
      console.log(uploadedTweet);
      return uploadedTweet;
    }).fail(function (error) {
      console.log(error);
    }).done();
  }
})();