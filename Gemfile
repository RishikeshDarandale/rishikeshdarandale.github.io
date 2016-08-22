source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']

group :jekyll_plugins do
  gem 'jekyll-sitemap', versions['jekyll-sitemap']
  gem 'jekyll-paginate', versions['jekyll-paginate']
  gem 'jekyll-gist', versions['jekyll-gist']
end