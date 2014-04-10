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
        observer.onError(new Error("Tweet fetching error"));
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
        observer.onError(new Error("Avatar fetching error"));
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
        observer.onError(new Error("Uploading error"));
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
