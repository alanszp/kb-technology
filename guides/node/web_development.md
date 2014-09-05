# Web Development

## Index

  - [Introduction](#introduction)
  - [Core Topics](#core-topics)
    - [Learning Express](#learning-express)
      - [About Express 4.x](#about-express-4.x)
    - [Runtime Configuration](#runtime-configuration)
    - [HTTP Requests Authentication](#http-requests-authentication)
  - [Additional Topics](#additional-topics)
    - [HOWTO: Upload files and Manipulate Images](#howto:-upload-files-and-manipulate-images)

## Introduction

We use a minimalistic framework combined with several modules to add extra functionality.

We use:
  * **Base Framework:** [Express](http://expressjs.com/), is simple & minimalistic.
    We currently use **version 4.x** (check [About Express 4.x](#about-express-4.x))
  * **Template Language:** [Jade](http://jade-lang.com/), node version of HAML.
  * **HTTP Security:** [Passport](http://passportjs.org/), provides several means
    for authentication through plugin.
  * **Runtime Configuration**: [config](https://github.com/lorenwest/node-config),
    provides a simple way to have different configuration environments.


## Core Topics

### Learning Express

To learn about Express framework, read:

  1. [Official Getting Started Guide](http://expressjs.com/guide.html)
  2. Then you can just jump into the [official documentation](http://expressjs.com/4x/api.html):
  3. Finally, for examples; check the
     [official repository examples](https://github.com/strongloop/express/tree/master/examples)

#### About Express 4.x

Express 4.x changes a few things from the previous versions. To learn about
the changes read [Moving to 4.x](http://expressjs.com/migrating-4.html) from
the official documenation.

The biggest addition/improvement to Express 4 is the new `Router` API. Check the
[documentation](http://expressjs.com/4x/api.html#router) and this
[example](https://github.com/strongloop/express/wiki/New-features-in-4.x#router)
to learn about it

For detailed information about the changes, check the following articles:
  * [Expressjs 4.0 new features and upgrading from 3.0](     http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0)
  * [Migrating from 3.x to 4.x](https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x#changed)


### Runtime Configuration

To configure the application for different runtime environments, we use the
[config](https://github.com/lorenwest/node-config) module.

The idea is simple:
  1. Have a different JSON for each runtime.
  2. The JSON is stored on a config folder, with the name of the runtime.
  3. Also, you can define a `default.json` where you define default properties.
  4. When you run the application, the config module uses the `NODE_ENV` environment
     variable to select which JSON to read.


Must Read:
  * [Documentations: Confguration Files](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

For the lazy, some nice features:

##### Deep Merge of configuration

All the matched json files are merged, and the merge is perfomed in *deep* fashion.

**default.json**  
```javascript
{
  "mails": {
      "from": "app28450595@heroku.com",
      "settings": {
        "uncompletedSurvey": {
          "template": "./server/mails/inline_uncompleted_survey.html",
          "subject": "You’re so close to finishing your Alaskaness quiz!"
        }
      }
    }
}
```  

**development.json**  
```javascript
{
  "mails": {
      "from": "pepejeans@gmail.com",
    }
}
```  

**resulting configuration**  
```javascript
{
  "mails": {
      "from": "pepejeans@gmail.com",
      "settings": {
        "uncompletedSurvey": {
          "template": "./server/mails/inline_uncompleted_survey.html",
          "subject": "You’re so close to finishing your Alaskaness quiz!"
        }
      }
    }
}
```

##### Use normal .js files

Instead of a .json file you can create a .js module that exports a json. Useful to read configuration from environment files.

```javascript
var config = {
  "database": process.env.MONGOHQ_URL,
  "assets": "build",
  "url_site": "http://zevals.herokuapp.com",
  "google": {
    "clientId": process.env.GOOGLE_CLIENT_ID,
    "clientSecret": process.env.GOOGLE_CLIENT_SECRET
  }
};

module.exports = config;
```

### HTTP Requests Authentication

We use [passport](http://passportjs.org/) as authentication middleware. It supports
authentication with OAuth, OAuth 2, Google, Facebook, Twitter, local with Mongo
( Can also be used with Postgresql but there's no default node module for that ),
all of that done with submodules you load.

To learn to use passport, must reads:

  * [Passport Official Guide](http://passportjs.org/guide/)


Additional Modules:
  * [connect-ensure-login](https://github.com/jaredhanson/connect-ensure-login):
    Ensures that a user is logged in ( not for API's )


## Additional Topics

### HOWTO: Upload files and Manipulate Images

**TODO upload**

* [cloudinary](https://github.com/cloudinary/cloudinary_npm): Upload images to cloudinary.
* [gm](http://aheckmann.github.io/gm/): A module to manipulate images with RMagick,
  ImageMagick, etc. ( on Heroku force to use ImageMagick see [here](http://stackoverflow.com/questions/16476666/image-resize-library-for-node-js-site-on-heroku-hosting) )


### Security

  Basic security concerns https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications

### Running

* [nodemon](https://github.com/remy/nodemon): Tool to reload the node server when a file is changed, we install this globally.
