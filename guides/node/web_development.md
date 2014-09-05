# Web Development

  We build applications with [Express](http://expressjs.com/), is simple, minimalistic, it has support for API's and templating, web use [Jade](http://jade-lang.com/) for templates.

#### Express 4 Changes

Express 4 will come with new features and improvements. You can see them [here](http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0) and [here](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x#changed) for more detailed information.

The biggest addition/improvement to Express 4 is the new `Router` API. [This](https://github.com/visionmedia/express/wiki/New-features-in-4.x#router) is a good short example of how to use it, and [here](http://expressjs.com/4x/api.html#router) you can see the full documentation if needed.



### Authentication  

  We use [passport](http://passportjs.org/) as authentication middleware, OAuth, OAuth 2, Google, Facebook, Twitter, local with Mongo ( Can also be used with Postgresql but there's no default node module for that )

* [connect-ensure-login](https://github.com/jaredhanson/connect-ensure-login): Ensures that a user is logged in ( not for API's )

### Upload files and Manipulate Images

//TODO upload

* [cloudinary](https://github.com/cloudinary/cloudinary_npm): Upload images to cloudinary.
* [gm](http://aheckmann.github.io/gm/): A module to manipulate images with RMagick, ImageMagick, etc. ( on Heroku force to use ImageMagick see [here](http://stackoverflow.com/questions/16476666/image-resize-library-for-node-js-site-on-heroku-hosting) )


### Security

  Basic security concerns https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications

### Running

* [nodemon](https://github.com/remy/nodemon): Tool to reload the node server when a file is changed, we install this globally.
