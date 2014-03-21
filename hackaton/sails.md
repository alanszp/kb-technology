# SailsJS

##Description
Sails is a nodejs framework designed to mimic the MVC pattern of frameworks like Ruby on Rails.

##Install Sails

```sh
$ [sudo] npm install -g sails 
```

##Creating a New Sails Project

```sh
$ sails new <project_name>
```

##Creating a Model

```sh
$ sails generate model <model_name>
```
That will create a file called api/models/<model_name>.js which will look something like this:

```node
module.exports = {

  attributes: {
    /* Complete with de definitions of the attributes */
  }

};
```