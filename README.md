# Unruly Tech

[![Build Status](https://travis-ci.org/unruly/unruly.github.io.svg?branch=develop)](https://travis-ci.org/unruly/unruly.github.io)

Unruly's Tech site.

## Contributing

### Adding and Changing Existing Content

#### Blog Posts

You can add and edit blog posts by going to the [blog folder](/source/blog) and editing the markdown files there. This can all be done via GitHub's interface so you don't need to have a complete local environment set up.

##### Frontmatter

All posts have frontmatter which declare variables like the title, tags and author of the post. For now you can see existing posts to figure out what's available.

#### Featured Sections and other text

Most text can be found either in the [data folder](/data) or if it's dynamic, in the [Javascript data folder](/source/javascripts/data). This can all be done via GitHub's interface so you don't need to have a complete local environment set up. You can make changes via GitHub's interface so you don't need to have a complete local environment set up.

### Installation

The website is built using [Middleman](https://middlemanapp.com/) which is written in Ruby so it's suggested you read up on both before making changes beyond that of adding and editing content.

Install dependencies:

```sh
gem install bundler
bundle install
```

### Pulling Changes

As multiple contributors may be making changes to files at the same time, it's suggested you `merge` using `git pull` rather than `rebase` and resolve any conflicts before pushing changes. This is so that your local commits don't overwrite any pushed changes.

If you do `rebase` then always go through your local commits and changes before you push them as they may overwrite pushed changes.

### Using Middleman

See [Middleman's Docs](https://middlemanapp.com/basics/install/)

```sh
bundle exec middleman         # Runs a local server for testing with livereload
bundle exec middleman build   # Builds the static website
```

### Deploying

[Travis](https://travis-ci.org/unruly/unruly.github.io) is already set up to deploy pushes automatically on successful builds so ideally you should not need to deploy manually from a local machine. If you need to deploy a previous build, Travis lets you. Just pick a build in Travis' web interface and re-run it. 

If you really need to deploy from a local machine, you can run:

```sh
bundle exec rake test deploy
```

## License

Copyright (c) 2015 Unruly
