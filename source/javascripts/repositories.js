var pages = pages || {};

pages.repositories = pages.repositories || (function() {

	function addRepositories(template) {
		$.getJSON('./javascripts/data/repos.json').success(function(reposConfig) {
			$.getJSON('http://api.tech.unruly.co/github/unruly/repos').success(function(repos) {
				var $reposContainer = $('#reposContainer');

				repos.map(function(repo) {
                        repo.pushed_at = new Date(repo.pushed_at);
                        return repo;
                    }).sort(function sortByUpdateDate(repoA, repoB) {
                        return  repoB.pushed_at - repoA.pushed_at;
                    }).forEach(function(repo) {
                        var repoConfig = reposConfig[repo.name] || {};
                        repo.language = repo.language || 'Mixed';
                        repo.homepage = repo.homepage || repo.html_url;

                        var repoHtml = Mustache.render(template, {
                            name: repo.name,
                            description: repo.description,
                            url: repo.homepage,
                            image: repoConfig.image,
                            badges: repoConfig.badges,
                            language: repo.language,
                            language_class: repo.language.toLowerCase(),
                            stars: repo.stargazers_count
                        });

                        $reposContainer.append(repoHtml);
                    });

                $reposContainer.find('.loading').remove();
            });
		});
	}

    function addForks(template) {
        $.getJSON('http://api.tech.unruly.co/github/unruly/forks').success(function(forks) {
            var $forksContainer = $('#forksContainer');

            forks.map(function(repo) {
                repo.pushed_at = new Date(repo.pushed_at);
                return repo;
            }).sort(function sortByUpdateDate(repoA, repoB) {
                return  repoB.pushed_at - repoA.pushed_at;
            }).forEach(function(repo) {
                repo.language = repo.language || 'Mixed';
                repo.homepage = repo.homepage || repo.html_url;

                var repoHtml = Mustache.render(template, {
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                    language: repo.language,
                    language_class: repo.language.toLowerCase(),
                    fork: repo.fork
                });

                $forksContainer.append(repoHtml);
            });

            $forksContainer.find('.loading').remove();
        });
    }

	function init() {
        $.get('./javascripts/partials/repo.mustache')
            .success(addRepositories)
            .success(addForks);
	}

	return {
		init: init
	};
})();

pages.repositories.init();