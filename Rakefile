task default: %w[test]

task :test do
  puts "\nRunning Tests"
  system "middleman build"
end

task :travis_deploy do
  puts "\nRunning Travis Deployment"
  puts "\nSetting up Git access"
  system "echo ${GH_TOKEN} > ./.git/credentials"
  system "git config --global user.name ${GH_USER}"
  system "git config --global user.email ${GH_EMAIL}"
  system "git remote set-url origin \"https://${GH_TOKEN}@github.com/unruly/unruly.github.io.git\""

  puts "\nCopying GitHub-specific files"
  system "cp -rv ./github/* ./build/"

  puts "\nDeploying to GitHub"
  system "middleman deploy"
end
