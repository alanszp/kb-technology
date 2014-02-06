Git Guide
=========

== Setup

=== Installation

Ubuntu

    sudo apt-get install git-core git-gui git-doc

Mac (homebrew)

    brew install git


=== Configuration

Then configure basic settings:

    git config --global user.name "NOMBRE APELLIDO"
    git config --global user.email "ACAVAELUSUARIO@zauberlabs.com"

=== Github Configuration

To configure *github* follow [Generating ssh keys](https://help.github.com/articles/generating-ssh-keys)

=== Zauber Git Configuration

    touch ~/.netrc
    chmod og-rwx ~/.netrc
    echo  machine git.zauberlabs.com login ACAVAELUSERNAME password ACAVALAPASSWORD >>  ~/.netrc

== Resources

  * [Pro Git book](http://git-scm.com/book/): Online book. One of the best options to learn git.
  * [gitready.com](http://gitready.com/): Git tips & tricks. "How to do X" kind of site.
