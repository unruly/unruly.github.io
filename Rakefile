task default: %w[test]

task :test do
  system "middleman build"
end

task :travis_deploy do
  system "echo ${GH_TOKEN} > ./.git/credentials"
  system "git config --global user.name ${GH_USER}"
  system "git config --global user.email ${GH_EMAIL}"
  system "git remote set-url origin \"https://${GH_TOKEN}@github.com/unruly/unruly.github.io.git\""
  system "middleman deploy"
end