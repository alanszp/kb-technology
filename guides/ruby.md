# Ruby Development Resources

- [Coding Style](#coding-style)
- [Mini Guides](#mini-guides)
	- [Testing](#testing)
	- [Upload Files & Manipulate Images](#upload-files-&-manipulate-images)
	- [Web Authentication & Authorization](#web-authentication-&-authorization)
	- [Running Background Jobs](#running-background-jobs)
	- [Deploying](#deploying)
	- [Using guard & spork to speed up development cycle](#using-guard-&-spork-to-speed-up-development-cycle)
	- [Debugging](#debugging)
	- [Web Development](#web-development)
	- [Create, Develop & Test Web API (suggested)](#create-develop-&-test-web-api-suggested)

## Coding Style

At Zauber we adhere to Bbatsov's community driving [style guides](https://github.com/bbatsov/ruby-style-guide)

**TODO** We need a rubocop configuration file to enforce this.

## Mini Guides

### Testing

Use [Rspec](http://rspec.info/) TDD & BDD Style testing framework.

  * To use it in rails, use: [Rspec Rails](https://github.com/rspec/rspec-rails)
  * Read: [How to write good specs](http://betterspecs.org/)

To create test objects, don't use **fixtures**, instead we use [Factory Girl](https://github.com/thoughtbot/factory_girl). It let you define factories to create new test objects.

  * [Tips and Tricks](http://arjanvandergaag.nl/blog/factory_girl_tips.html)

If you need a database in your tests, you'll need to clean it before/after each test. Fixtures did this, but since we are using Factory Girl, the best option is to use [DatabaseCleaner](https://github.com/bmabey/database_cleaner).

To do **browsers tests** use [Capybara](https://github.com/jnicklas/capybara) (End-to-End testing). Read:

  * [End-to-end testing with Capybara and Rspec](http://robots.thoughtbot.com/rspec-integration-tests-with-capybara)
  * [Capybara (with Selenium) and Rspec](http://www.opinionatedprogrammer.com/2011/02/capybara-and-selenium-with-rspec-and-rails-3/)

To create **functional tests** we use [Cucumber](http://cukes.info/) which lets you define your test using simple text files.

  * For rails integration [Cucumber Rails](https://github.com/cucumber/cucumber-rails)
  * [Starting with Cucumber and Capybara](http://loudcoding.com/posts/quick-tutorial-starting-with-cucumber-and-capybara-bdd-on-rails-project/)
  * [Beginning with Cucubmer (Railscast)](http://railscasts.com/episodes/155-beginning-with-cucumber)

### Upload Files & Manipulate Images

When you need to **upload files**, the two typical options are: Paperclip and [CarrierWave](https://github.com/carrierwaveuploader/carrierwave). We use Carrierwave, which seems to be the most complete solution. You can check [this](http://stackoverflow.com/questions/14028017/heading-into-2013-should-i-go-with-dragonfly-or-paperclip-or-carrierwave) stackoverflow question about this.

Some links about CarrierWave:

  * [Carrierwave File Uploads (Railscast)](http://railscasts.com/episodes/253-carrierwave-file-uploads)
  * [How to validate attachment size](https://github.com/carrierwaveuploader/carrierwave/wiki/How-to%3A-Validate-attachment-file-size)
  * [How to validate extensions](https://github.com/carrierwaveuploader/carrierwave#securing-uploads)


If the case, is image manipulation, typically after you upload the files. We use [Rmagick](https://github.com/rmagick/rmagick) which is a ruby interface to the popular image processing libraries ImageMagick and GraphicsMagick.

  - [Image Manipulation (Railscast)](http://railscasts.com/episodes/374-image-manipulation)
  - [Instructions to install in ubuntu (Dec'12)](http://blog.evnpr.com/2012/12/install-rmagick-in-ubuntu-1204.html)

There is also a third party service solution, that solves image manipulation, upload, and serving them with a CDN. That's [Cloudinary](https://github.com/cloudinary/cloudinary_gem), and it has a free tier that's ok for simple cases.
It works well with CarrierWave.

  - [Ruby on Rails integration](http://cloudinary.com/documentation/rails_integration)
  - [Cloudinary & Heroku](https://devcenter.heroku.com/articles/cloudinary)

### Web Authentication & Authorization

Depending on what you need, maybe **basic authentication** is ok. Check [Authentication from scratch](http://railscasts.com/episodes/250-authentication-from-scratch-revised?autoplay=true) Railscast first.

When we need to add **authentication** to your web application, the typical option is to use [Devise](https://github.com/plataformatec/devise). It has several modules and can do things like Password Recovery, Tracking, Session Timeout, Account Locking, Account Confirmation, and others. It's based on [Warden](https://github.com/hassox/warden) which is a Rack Middleware for web authentication.

  - [Getting Started](https://github.com/plataformatec/devise#getting-started)
  - [Configuring Views](https://github.com/plataformatec/devise#configuring-views)
  - [Devise (Railscast)](http://railscasts.com/episodes/209-devise-revised)
  - [Authentication with Warden (Railscast)](http://railscasts.com/episodes/305-authentication-with-warden)

For **authorization** we had used [Cancan](https://github.com/ryanb/cancan). But we didn't love it. Keep searching for a others solutions.

  - [Devise and Cancan](http://www.tonyamoyal.com/2010/07/28/rails-authentication-with-devise-and-cancan-customizing-devise-controllers/)

For **OAuth** and authentication with differente sites, you can use [OmniAuth](https://github.com/intridea/omniauth).

  - [List of providers (sites you can use to authenticate)](https://github.com/intridea/omniauth/wiki/List-of-Strategies)
  - [Devise & Omniauth (Railscast)](http://railscasts.com/episodes/235-devise-and-omniauth-revised)
  - [Simple Omniauth (Railscast)](http://railscasts.com/episodes/241-simple-omniauth-revised)
  - [Facebook Integration (Railscast)](http://railscasts.com/episodes/360-facebook-authentication)
  - [Twitter Integration (Railscast)](http://railscasts.com/episodes/359-twitter-integration)

### Running Background Jobs

Resque vs. delayed_job, foreman

forever (https://github.com/daddye/foreverb) [no se que es :D]

### Deploying

Unicorn, nginx, capistrano, chef?

### Using guard & spork to speed up development cycle

[Guard](https://github.com/guard/guard) is a command line tool to easily handle events on file system modifications. With it, you can run tasks such as `rake db:migrate`, `bundle install` or tests whenever a change in your project files happens. It works with different plugins.

  - Check [Guardfile examples](https://github.com/guard/guard/wiki/Guardfile-examples) to start
  - [Railcast](http://railscasts.com/episodes/264-guard)

Recommended Guards ([complete list](https://github.com/guard/guard/wiki/List-of-available-Guards)):
  - [Guard for Rspec](https://github.com/guard/guard-rspec) -  Runs `rspec` everytime your files change
  - [Guard for Bundle](https://github.com/guard/guard-bundler) - Runs `bundle install` everytime you `GemFile` changes
  - [Guard for db:migrate](https://github.com/guard/guard-migrate ) - Runs `rake db:migrate` when a new migration appears in you fs.
  - [Guard for spork](https://github.com/guard/guard-spork) - Runs spork (see below)

When working with rails, launching rails every time you do a test takes a lot of time. For that cases, [Spork ](https://github.com/sporkrb/spork) was created. What it does, is create a separated process that loads your application, and everytime you want to do a test, it forks and runs. This way, it's speedup the test execution. It currently works for Rspec and Cucumber.

  - See [Spork-rails](https://github.com/sporkrb/spork-rails#spork-rails)
  - [Railscast](http://railscasts.com/episodes/285-spork)

### Debugging

For debugging we use [pry](http://pryrepl.org/), that is a REPL and it let's you stop the execution and inspect the current context

* [Pry](https://github.com/rweng/pry-rails) Gem to use pry with rails
  - [Basic Concepts](http://vimeo.com/26391171) **MUST SEE** What's a repl and how to use it.
  - [Pry with rails (Railscast)](http://railscasts.com/episodes/280-pry-with-rails)
* [Pry-doc](https://github.com/pry/pry-doc) Adds show-doc and show-source methods
  - [Issue](https://github.com/banister/pry-doc/issues/3) About gem order in Gemfile.

### Web Development

  * [Rack](http://rack.github.io/) Base web interface, we don't use directly, but rails use it
  * [Versionist](https://github.com/bploetz/versionist) - To handle API versioning
    - [Railcast](http://railscasts.com/episodes/350-rest-api-versioning)
  * Rails

### Create, Develop & Test Web API (suggested)

Versionist, Apiary?, que mas?
