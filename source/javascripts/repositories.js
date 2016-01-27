var pages = pages || {};

pages.repositories = pages.repositories || (function() {

    function init() {
        $.get('./javascripts/partials/repo.mustache')
            .success(addRepositories)
            .success(addForks);
    }

	function addRepositories(template) {
		$.getJSON('./javascripts/data/repos.json').success(function(configs) {
            _createRepos('#reposContainer', template, 'http://api.tech.unruly.co/github/unruly/repos', configs);
        });
    }

    function addForks(template) {
        _createRepos('#forksContainer', template, 'http://api.tech.unruly.co/github/unruly/forks');
    }

    function _createRepos(selector, template, url, configs) {
        $.getJSON(url).success(function(repos) {
            var $container = $(selector);

            repos.map(function(repo) {
                repo.pushed_at = new Date(repo.pushed_at);
                return repo;
            }).sort(function sortByUpdateDate(repoA, repoB) {
                return  repoB.pushed_at - repoA.pushed_at;
            }).forEach(function(repo) {
                var config = _getConfigForRepo(configs, repo);
                var repoHtml = Mustache.render(template, _getTemplateProperties(repo, config));
                $container.append(repoHtml);
            });

            $container.find('.loading').remove();
        });
    }

    function _getConfigForRepo(configs, repo) {
        configs = configs || {};

        var config = configs[repo.name] || {};

        if(config.badges) {
            config.badges.filter(function(config) {
                return !config.url;
            }).forEach(function(config) {
                config.url = repo.html_url;
            });
        }

        return config;
    }

    function _getTemplateProperties(repo, config) {
        var language = repo.language || 'Mixed';
        var projectUrl = repo.homepage || repo.html_url;

        if(repo.fork) {
            projectUrl = repo.html_url;
        }

        return {
            name: repo.name,
            description: repo.description,
            projectUrl: projectUrl,
            repoUrl: repo.html_url,
            image: config.image,
            badges: config.badges,
            language: language,
            language_class: language.toLowerCase(),
            stars: repo.stargazers_count,
            fork: repo.fork
        }
    }

	return {
		init: init
	};
})();

pages.repositories.init();