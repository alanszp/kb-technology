# Async Tweets Example

The idea of this example is to perform a task conformed by 3 dependent async steps.

The async steps are the following:

- Fetch tweets.
- Download the author's avatar of each tweet.
- Upload each tweet with the avatar to Amazon S3.

## Reactive Approach (using RxJS)

- **Framework Repo:** [https://github.com/Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS)
- **Documentation of methods used in the example:** [Observable Docs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md#observable-object)

### Source Code

```js
var Rx = require('rx');

/**
tweetSource: simulates a source of tweets, with a 1% of error probability.
**/
var tweetSource = Rx.Observable.create(function (observer) {
  for (var i = 0; i < 100; i++) {
    setTimeout(function (tweetNumber) {
      var r = Math.random();
      if (r < 0.99) {
        observer.onNext("Tweet " + (tweetNumber + 1));
      } else {
        observer.onError("Tweet fetching error");
      }
    }, Math.random() * 5000, i);
  }
});

/**
tweetWithAvatarSource: simulates the avatar download for each tweet, with a 1% of error probabilty.
**/
var tweetWithAvatarSource = tweetSource.flatMap(function newTweetReceived(tweet) {
  return Rx.Observable.create(function (observer) {
    setTimeout(function (tweet) {
      var r = Math.random();
      if (r < 0.99) {
        observer.onNext(tweet + " + Avatar");
      } else { 
        observer.onError("Avatar fetching error");
      }
    }, Math.random() * 5000, tweet);
  });
});

/**
uploadSource: simulates the tweet upload, with 1% of error probability.
**/
var uploadSource = tweetWithAvatarSource.flatMap(function tweetWithAvatar(tweetWithAvatar) {
  return Rx.Observable.create(function (observer) {
    setTimeout(function (tweetWithAvatar) {
      var r = Math.random();
      if (r < 0.99) {
        observer.onNext(tweetWithAvatar + " + uploaded");
      } else {
        observer.onError("Uploading error");
      }
    }, Math.random() * 5000, tweetWithAvatar);
  });
});

uploadSource.subscribe(
  function onNext(tweet) {
    console.log(tweet);
  }, 
  function onError(error) {
    console.log(error);
  }
);
```

### Some comments

- The `onError` callback is for the full stream. So if it is called, the stream is considered completed, and is not going to send more events. Therefore, in the example, if there is an error, it will stop all the procedure. So, if we want to handle the error of a tweet in any of the steps, we have to do it manually in each step without calling the `onError` callback.

## Promises Approach (using Q)

- **Framework Repo:** [https://github.com/kriskowal/q](https://github.com/kriskowal/q)
- **Documentation**: [Q API Reference](https://github.com/kriskowal/q/wiki/API-Reference)

### Source Code

```js
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
```
