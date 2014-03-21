# Scenarios

## Scenario 1: Tweets
Having a stream of tweets, for each tweet it should obtain the author's avatar and upload it to S3.

### RxJS

```js
var Rx = require('rx'),
winston = require('winston');

var fetchTweets = Rx.Observable.create(function (observer) {
  var r = Math.random();
  if (r < 0.95) {
    for (var i = 0; i < 5; i++) {
      setTimeout(function (tweetNumber) {
        observer.onNext("Tweet " + (tweetNumber + 1));
      }, Math.random() * 2000, i);
    }
  } else {
    observer.onError("Error in tweets fetch");
  };
});

var fetchAvatar = fetchTweets.flatMap(function (tweet) {
  return Rx.Observable.create(function (observer) {
    var r = Math.random();
    if (r < 0.95) {
      setTimeout(function () {
        observer.onNext(tweet + " with avatar");
      }, Math.random() * 2000, tweet);
    } else {
      observer.onError("Error in avatar fetch for " + tweet);
    }
  });
});

var uploadAvatar = fetchAvatar.flatMap(function (avatar) {
  return Rx.Observable.create(function (observer) {
    var r = Math.random();
    if (r < 0.95) {
      setTimeout(function () {
        observer.onNext(avatar + " uploaded to S3");
      });   
    } else {
      observer.onError("Error in upload to S3 for " + avatar);
    }
  });
});

uploadAvatar.subscribe(function (tweet) {
  console.log(tweet);
}, function (error) {
  if (!!error) {
    winston.log("error", error);
  };
});
```
