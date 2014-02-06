# Ruby Development Resources

## Coding Style

At Zauber we adhere to Bbatsov's community driving [style guides](https://github.com/bbatsov/ruby-style-guide)

**TODO** We need a rubocop configuration file to enforce this.

## Recommended Gems

### Testing

  * [Rspec](http://rspec.info/) TDD & BDD Style testing framework
    * [Rspec Rails](https://github.com/rspec/rspec-rails)
    * [How to write good specs](http://betterspecs.org/)
  * [Capybara](https://github.com/jnicklas/capybara) (End-to-End testing)
    - [End-to-end testing with Capybara and Rspec](http://robots.thoughtbot.com/rspec-integration-tests-with-capybara)
    - [Capybara (with Selenium) and Rspec](http://www.opinionatedprogrammer.com/2011/02/capybara-and-selenium-with-rspec-and-rails-3/)
  * [Cucumber](http://cukes.info/) Testing framework for BDD. You write plain text tests
    - [Cucumber Rails](https://github.com/cucumber/cucumber-rails)
    - [Starting with Cucumber and Capybara](http://loudcoding.com/posts/quick-tutorial-starting-with-cucumber-and-capybara-bdd-on-rails-project/)
    - [Railcast](http://railscasts.com/episodes/155-beginning-with-cucumber)
  * [Spork ](https://github.com/sporkrb/spork) - Test server to run test faster
    - [Spork-rails](https://github.com/sporkrb/spork-rails#spork-rails)
  * [Factory Girl](https://github.com/thoughtbot/factory_girl) - Instead of using fixtures, create *factories* for your tests objects.
    - [Tips and Tricks](http://arjanvandergaag.nl/blog/factory_girl_tips.html)
  * [DatabaseCleaner](https://github.com/bmabey/database_cleaner) - When using rspec and factory girl, use this to clean your DB after/before each test.

  * [Guard](https://github.com/guard/guard)
    - [Plugin for Rspec](https://github.com/guard/guard-rspec) -  Runs `rspec` everytime your files change
    - [Plugin for Bundle](https://github.com/guard/guard-bundler) - Runs `bundle install` everytime you `GemFile` changes
    - [Plugin for db:migrate](https://github.com/guard/guard-migrate ) - Runs `rake db:migrate` when a new migration appears in you fs.


### Image Manipulation

  * [Rmagick](https://github.com/rmagick/rmagick)
    - [Railcast](http://railscasts.com/episodes/374-image-manipulation)
    - [To install in ubuntu](http://blog.evnpr.com/2012/12/install-rmagick-in-ubuntu-1204.html)
  * [CarrierWave](https://github.com/carrierwaveuploader/carrierwave)
    - [Railcast](http://railscasts.com/episodes/253-carrierwave-file-uploads)
    - [How to validate attachment size](https://github.com/carrierwaveuploader/carrierwave/wiki/How-to%3A-Validate-attachment-file-size)
    - [How to validate extensions](https://github.com/carrierwaveuploader/carrierwave#securing-uploads)

  * [Cloudinary](https://github.com/cloudinary/cloudinary_gem)
    - [Ruby on Rails integration](http://cloudinary.com/documentation/rails_integration)
    - [Cloudinary & Heroku](https://devcenter.heroku.com/articles/cloudinary)


### Web

  * [Rack](http://rack.github.io/) Base web interface, we don't use directly, but rails use it
  * [Versionist](https://github.com/bploetz/versionist) - To handle API versioning
    - [Railcast](http://railscasts.com/episodes/350-rest-api-versioning)
  *

### Web Frameworks

  * Rails


### Web Security
  * [Devise](https://github.com/plataformatec/devise). For Authentication
    - [Getting Started](https://github.com/plataformatec/devise#getting-started)
    - [Configuring Views](https://github.com/plataformatec/devise#configuring-views)
  * [Cancan](https://github.com/ryanb/cancan) For Authorization
    - [Devise and Cancan](http://www.tonyamoyal.com/2010/07/28/rails-authentication-with-devise-and-cancan-customizing-devise-controllers/)
