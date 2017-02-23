require "rubygems"
require "bundler/setup"
require "stringex"

##############
# Jekyll tasks
##############

# Usage: rake serve, rake serve:prod
task :serve => ["serve:dev"]
namespace :serve do

  desc "Serve development Jekyll site locally"
  task :devnowatch do
    puts "Starting up development Jekyll site server..."
    system "bundle exec jekyll serve --no-watch --config _config.yml,_config.dev.yml"
  end

  desc "Serve development Jekyll site locally"
  task :dev do
    puts "Starting up development Jekyll site server..."
    system "bundle exec jekyll serve --config _config.yml,_config.dev.yml"
  end

  desc "Serve production Jekyll site locally"
  task :prod do
    puts "Starting up production Jekyll site server..."
    system "bundle exec jekyll serve --no-watch"
  end
end

# Usage: rake build, rake build:dev, rake build:drafts
task :build => ["build:prod"]
namespace :build do

  desc "Regenerate files for production"
  task :prod do
    puts "* Regenerating files for production..."
    system "JEKYLL_ENV=production bundle exec jekyll build"
  end

  desc "Regenerate files for production (Windows systems)"
  task :win do
    puts "* Regenerating files for production..."
    system "bundle exec jekyll build"
  end

  desc "Regenerate files for development"
  task :dev do
    puts "* Regenerating files for development..."
    system "bundle exec jekyll build --config _config.yml,_config.dev.yml --profile"
  end

  desc "Regenerate files and drafts for development"
  task :drafts do
    puts "* Regenerating files and drafts for development..."
    system "bundle exec jekyll build --config _config.yml,_config.dev.yml --profile --drafts"
  end
end

####################
# Notification tasks
####################

# Usage: rake notify
# task :notify => ["notify:pingomatic", "notify:google", "notify:bing"]
# desc "Notify various services that the site has been updated"
# namespace :notify do

#   desc "Notify Ping-O-Matic"
#   task :pingomatic do
#     begin
#       require 'xmlrpc/client'
#       puts "* Notifying Ping-O-Matic that the site has updated"
#       XMLRPC::Client.new('rpc.pingomatic.com', '/').call('weblogUpdates.extendedPing', 'mademistakes.com' , 'https://mademistakes.com', 'https://mademistakes.com/atom.xml')
#     rescue LoadError
#       puts "! Could not ping ping-o-matic, because XMLRPC::Client could not be found."
#     end
#   end

#   desc "Notify Google of updated sitemap"
#   task :google do
#     begin
#       require 'net/http'
#       require 'uri'
#       puts "* Notifying Google that the site has updated"
#       Net::HTTP.get('www.google.com', '/webmasters/tools/ping?sitemap=' + URI.escape('https://mademistakes.com/sitemap.xml'))
#     rescue LoadError
#       puts "! Could not ping Google about our sitemap, because Net::HTTP or URI could not be found."
#     end
#   end

#   desc "Notify Bing of updated sitemap"
#   task :bing do
#     begin
#       require 'net/http'
#       require 'uri'
#       puts '* Notifying Bing that the site has updated'
#       Net::HTTP.get('www.bing.com', '/webmaster/ping.aspx?siteMap=' + URI.escape('https://mademistakes.com/sitemap.xml'))
#     rescue LoadError
#       puts "! Could not ping Bing about our sitemap, because Net::HTTP or URI could not be found."
#     end
#   end
# end

##################
# Deployment tasks
##################

# Usage: rake rsync
# desc "rsync the contents of ./_site to the server"
# task :rsync do
#   puts "* rsyncing the contents of ./_site to the server"
#   system "rsync --perms --recursive --verbose --compress --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r _site/ new-mademistakes.com@s210904.gridserver.com:domains/mademistakes.com/html/"
# end

# # Usage: rake deploy, rake deploy:win
# task :deploy => ["deploy:prod"]
# namespace :deploy do
#   desc "Regenerate and rsync production files and notify services of the update"
#   task :prod => ["build", "rsync", "notify"] do
#   end

#   # Usage: rake deploy:win
#   desc "Regenerate and rsync production files and notify services of the update (Windows systems)"
#   task :win => ["build:win", "rsync", "notify"] do
#   end
# end


## -- Config -- ##

# posts_dir       = "_alimentation-biologique"    # directory for blog files
# new_post_ext    = "md"  # default new post file extension when using the new_post task
# new_page_ext    = "md"  # default new page file extension when using the new_page task


###########################
# Create a new Post or Page
###########################

# usage rake new_post
# desc "Create a new post in #{posts_dir}"
# task :post_alimentation, :title do |t, args|
#   if args.title
#     title = args.title
#   else
#     title = get_stdin("Enter a title for your post: ")
#   end
#   filename = "#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
#   if File.exist?(filename)
#     abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
#   end
#   tags = get_stdin("Enter tags to classify your post (comma separated): ")
#   puts "Creating new post: #{filename}"
#   open(filename, 'w') do |post|
#     post.puts "---"
#     post.puts "layout: post"
#     post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
#     post.puts "modified: #{Time.now.strftime('%Y-%m-%d %H:%M:%S %z')}"
#     post.puts "tags: [#{tags}]"
#     post.puts "image:"
#     post.puts "  feature: "
#     post.puts "  credit: "
#     post.puts "  creditlink: "
#     post.puts "comments: "
#     post.puts "share: "
#     post.puts "---"
#   end
# end

# usage rake new_page
# desc "Create a new page"
# task :new_page, :title do |t, args|
#   if args.title
#     title = args.title
#   else
#     title = get_stdin("Enter a title for your page: ")
#   end
#   filename = "#{title.to_url}.#{new_page_ext}"
#   if File.exist?(filename)
#     abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
#   end
#   tags = get_stdin("Enter tags to classify your page (comma separated): ")
#   puts "Creating new page: #{filename}"
#   open(filename, 'w') do |page|
#     page.puts "---"
#     page.puts "layout: page"
#     page.puts "permalink: /#{title.to_url}/"
#     page.puts "title: \"#{title}\""
#     page.puts "modified: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
#     page.puts "tags: [#{tags}]"
#     page.puts "image:"
#     page.puts "  feature: "
#     page.puts "  credit: "
#     page.puts "  creditlink: "
#     page.puts "share: "
#     page.puts "---"
#   end
# end

# def get_stdin(message)
#   print message
#   STDIN.gets.chomp
# end

# def ask(message, valid_options)
#   if valid_options
#     answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
#   else
#     answer = get_stdin(message)
#   end
#   answer
# end
