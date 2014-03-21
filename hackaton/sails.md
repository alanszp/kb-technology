# SailsJS

##Description
Sails is a nodejs framework designed to mimic the MVC pattern of frameworks like Ruby on Rails.

##Install Sails

Before Installing sails you need nodeJS and npm already installed
```sh
$ [sudo] npm install -g sails 
```

##Creating a New Sails Project

```sh
$ sails new <project_name>
```

##Running the app

```sh
$ sails lift
```
This will start the app in http://localhost:1337

##Creating a Model

```sh
$ sails generate model <model_name>
```
This will only create a file called api/models/<model_name>.js which will look something like this:

```node
module.exports = {

  attributes: {
    /* Complete with de definitions of the attributes */
  }

};
```
But it won't create the associated controller.


##Creating a Controller for a model

```sh
$ sails generate controller <model_name>
```
That will create a file called api/controllers/<model_name>Controller.js which will look something like this:

```node
module.exports = {

  /* Not CRUD functions definitions */

  _config: {}

};
```
By defualt, the controller will already have the CRUD functions:

  * create(JSON, callback);
  * update(JSON, callback);
  * find(JSON, callback);
  * findOne(JSON, callback);
  * destroy(JSON, callback);

Which are exposed in a REST API

  * HOST/model/
  * HOST/model?params
  * HOST/model/create?params
  * HOST/model/update/:id?params
  * HOST/model/destroy/:id


##Creating both, Model and Controller, at once

```sh
$ sails generate <model_name>
```

##Local environment settings

Sails uses NODE_ENV and PORT environment variables if possible, if not it uses the defaults values specified in the file config/locale.js

##Already got used to express?

In general, since Sails uses Connect/Express at its core, all of the Connect/Express-oriented things work pretty well. In fact, Sails has no problem interpreting most Express middleware to work with socket.io.

##Testing the app with Mocha

For testing your app is neccesary he following **before** and **after** code is needed.
Once Sails app is lifted, you will have your models and controllers available automatically. So there is no need to require them. 

```node
var Sails = require('sails');

console.log(User);

describe("Testing sails app", function() {  

  // create a variable to hold the instantiated sails server
  var app;

  // Global before hook
  before(function(done) {

    // Lift Sails and start the server
    Sails.lift({

      log: {
        level: 'error'
      },

    }, function(err, sails) {
      app = sails;
      done(err, sails);
    });
  });

  // Global after hook
  after(function(done) {
    app.lower(done);
  });

  /* Here is your tests */

});  
```