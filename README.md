# Unruly Tech

[![Build Status](https://travis-ci.org/unruly/unruly.github.io.svg?branch=develop)](https://travis-ci.org/unruly/unruly.github.io)

Unruly's Tech site.

## Installation

Install dependencies:

```sh
gem install bundler
bundle install
```

## Usage

### Using Middleman

See [Middleman's Docs](https://middlemanapp.com/basics/install/)

```sh
bundle exec middleman         # Runs a local server for testing with livereload
bundle exec middleman build   # Builds the static website
```

## Deploying

[Travis](https://travis-ci.org/unruly/unruly.github.io) is already set up to deploy pushes automatically on successful builds so ideally you should not need to deploy manually from a local machine. If you need to deploy a previous build, Travis lets you. Just pick a build in Travis' web interface and re-run it. 

If you really need to deploy from a local machine, you can run:

```sh
bundle exec rake test deploy
```

### Excluding Files from Deployment

If you want to exclude files on deploy like `.DS_Store`, make sure you have a global `.gitignore`. This is because the
deploy branch (which is `master`) is automatically pushed to using a clean new branch that doesn't have a `.gitignore`.


1. Defined a location of your global `.gitignore`:

   ```sh
   git config --global core.excludesfile ~/.gitignore_global
   ```

2. Create a `~/.gitignore_global` file with appropriate ignore rules.
