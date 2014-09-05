# AngularJS Development Resources

- [Coding Style](#coding-style)
- [Popular Modules](#popular-modules)
- Guides
  - [Testing in AngularJS](./testing.md)

***

## Coding Style

  We use a [Sublime linter plugin](https://github.com/SublimeLinter/SublimeLinter-jshint) with a [.jshintrc](../templates/node.js/.jshintrc)

***

## Popular Modules

First! It's a good practice to browse *popular* modules in [ngmodules.org](http://ngmodules.org/).


### General

  * [lodash](http://lodash.com/): Utility methods for doing map,
    filter and a bunch of others things.
  * [moment.js](http://momentjs.com/): Parse, validate, manipulate, and display dates in
    javascript.
  * [ui-router](https://github.com/angular-ui/ui-router) Routing framework
  * [angular-ui-boostrap](http://angular-ui.github.io/bootstrap/) Bootstrap components as directives, these module does not depende on Bootstrap's javascript, it only uses the html and css.
  Compatible with Bootstrap 3.

### Async & Promises

  * [bluebird](https://github.com/petkaantonov/bluebird): To avoid callback hell we use
    promises, these are the best you can get now ;), How do I use Bluebird with Angular? easy! [check this](http://stackoverflow.com/questions/23984471/how-do-i-use-bluebird-with-angular/23984472#23984472)