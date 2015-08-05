set :css_dir, './stylesheets'
set :js_dir, './javascripts'
set :images_dir, './images'
set :relative_links, true

activate :automatic_image_sizes
activate :relative_assets

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
  # Doesn't work with references in Javascript
  # activate :asset_hash
end

activate :blog do |blog|
  blog.name = "blog"
  blog.prefix = "blog"
  # blog.sources = "blog/{year}-{month}-{day}-{title}.html"
  blog.calendar_template = "blog/calendar.html"
  blog.tag_template = "blog/calendar.html"
  blog.layout = "post"
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'master'

  committer_app = "#{Middleman::Deploy::PACKAGE} v#{Middleman::Deploy::VERSION}"
  commit_message = "Deployed using #{committer_app}"

  if ENV["TRAVIS_BUILD_NUMBER"] then
    commit_message += " (Travis Build \##{ENV["TRAVIS_BUILD_NUMBER"]})"
  end

  deploy.commit_message = commit_message
end
