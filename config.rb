Tilt::SYMBOL_ARRAY_SORTABLE = false

set :relative_links, true
set :markdown_engine,
    :redcarpet

set :markdown,
    # Renderer Options
    :with_toc_data => true,
    :safe_links_only => true,
    # Extension Options
    :disable_indented_code_blocks => true,
    :fenced_code_blocks => true,
    :strikethrough => true,
    :smartypants => true,
    :space_after_headers => true,
    :superscript => true,
    :underline => true,
    :highlight => true,
    :footnotes => true

ignore '/templates/blank.html'
ready do
  ["repositories"].each do |name|
    proxy "/data/#{name}.json", "/templates/blank.html", :locals => { :content => app.send('data').send(name).to_json }
  end
end

activate :automatic_image_sizes
activate :relative_assets

activate :blog do |blog|
  blog.name = "blog"
  blog.prefix = "blog"
  # blog.sources = "blog/{year}-{month}-{day}-{title}.html" # default
  blog.calendar_template = "blog/calendar.html"
  blog.tag_template = "blog/calendar.html"
  blog.layout = "post"
end

activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.branch = 'master'

  committer_app = "#{Middleman::Deploy::PACKAGE} v#{Middleman::Deploy::VERSION}"
  commit_message = "Deployed using #{committer_app}"

  if ENV["TRAVIS_BUILD_NUMBER"] then
    commit_message += " (Travis Build \##{ENV["TRAVIS_BUILD_NUMBER"]})"
  end

  deploy.commit_message = commit_message
end


configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :minify_html
end
