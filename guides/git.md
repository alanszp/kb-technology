Git Guide
=========

- [Setup](#setup)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Github Configuration](#github-configuration)
  - [Zauber Git Configuration](#zauber-git-configuration)
- [Resources](#resources)

## Setup

### Installation

Ubuntu

    sudo apt-get install git-core git-gui git-doc

Mac (homebrew)

    brew install git


### Configuration

Then configure basic settings:

    git config --global user.name "NOMBRE APELLIDO"
    git config --global user.email "ACAVAELUSUARIO@zauberlabs.com"
    
Color output

    git config --global color.ui auto
    
Basic Aliases

    git config --global alias.co checkout
    git config --global alias.st status
    git config --global alias.ft fetch
    git config --global alias.ci commit
    git config --global alias.br branch

### Github Configuration

To configure *github* follow [Generating ssh keys](https://help.github.com/articles/generating-ssh-keys)

### Zauber Git Configuration

    touch ~/.netrc
    chmod og-rwx ~/.netrc
    echo  machine git.zauberlabs.com login ACAVAELUSERNAME password ACAVALAPASSWORD >>  ~/.netrc

## Recipes

Take a look at [gitready.com](http://gitready.com/) for more recipes.

### Delete a remote branch

From [gitready article](http://gitready.com/beginner/2009/02/02/push-and-delete-branches.html)

Just use a `:` before the branch name.

    git push origin :branch-to-remove


## Resources

  * [Pro Git book](http://git-scm.com/book/): Online book. One of the best options to learn git.
  * [gitready.com](http://gitready.com/): Git tips & tricks. "How to do X" kind of site.
