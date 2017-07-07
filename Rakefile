task default: %w[test]

task :test do
  puts "\nBuilding project"
  try "middleman build --verbose"
end

namespace :travis do
  task :script do
    Rake::Task["test"].invoke
  end

  task :after_success do
    try "./travis-deploy.sh"
  end
end

def try(command)
  system command
  if $? != 0 then
    raise "Command: `#{command}` exited with code #{$?.exitstatus}"
  end
end
