var pages = pages || {};

pages.index = pages.index || (function() {

	function addRepositories(template) {
		$.getJSON('./javascripts/data/repos.json').success(function(reposConfig) {
			$.getJSON('http://jahed.unruly.co/github/unruly/repos').success(function(repos) {
				var $reposContainer = $('#reposContainer');

				repos.forEach(function(repo) {
                    var repoConfig = reposConfig[repo.name];
					var repoHtml = Mustache.render(template, {
						name: repo.name,
						description: repo.description,
						url: repo.homepage || repo.html_url,
						image: repoConfig ? repoConfig.image : null,
                        badges: repoConfig ? repoConfig.badges : null
					});

					$reposContainer.append(repoHtml);
				});

                $reposContainer.find('.loading').remove();
            });
		});
	}


	function init() {
        $.get('./javascripts/partials/repo.mustache').success(addRepositories);
	}

	return {
		init: init
	};
})();

pages.index.init();