# Unruly Tech

Unruly's Tech site.

## Installation

Install dependencies:

```sh
gem install
```

## Usage

### Using Middleman

See [Middleman's Docs](https://middlemanapp.com/basics/install/)

```sh
middleman         # Runs a local server for testing with livereload
middleman build   # Builds the static website
middleman deploy  # Builds and deploys to gh-pages
```

### Excluding Files from Deployment

If you want to exclude files on deploy like `.DS_Store`, make sure you have a global `.gitignore`. This is because the
deploy branch (which is `master`) is automatically pushed to using a clean new branch that doesn't have a `.gitignore`.


1. Defined a location of your global `.gitignore`:

   ```sh
   git config --global core.excludesfile ~/.gitignore_global
   ```

2. Create a `~/.gitignore_global` file with appropriate ignore rules.
