var pages = pages || {};

pages.index = pages.index || (function() {

	function addRepositories(template) {
		$.getJSON('./javascripts/data/repos.json').success(function(reposConfig) {
			$.getJSON('http://jahed.unruly.co/github/unruly/repos').success(function(repos) {
				var $reposContainer = $('#reposContainer');

				repos.forEach(function(repo) {
					var repoHtml = Mustache.render(template, {
						name: repo.name,
						description: repo.description,
						url: repo.html_url,
						image: reposConfig[repo.name] ? reposConfig[repo.name].image : null
					});

					$reposContainer.append(repoHtml);
				});

                $reposContainer.find('.loading').remove();
            });
		});
	}

    function addFeaturedRepo(template) {
        $.getJSON('./javascripts/data/repos.json').success(function(reposConfig) {
            var $featuredRepoContainer = $('#featuredRepoContainer');

            var featuredRepoHtml = Mustache.render(template, {
                title: reposConfig.featured.title,
                description: reposConfig.featured.description,
                link: reposConfig.featured.link,
                image: reposConfig.featured.image || './images/featured-repo-placeholder.jpg'
            });

            $featuredRepoContainer.append(featuredRepoHtml);
        });
    }


	function init() {
        $.get('./javascripts/partials/repo.mustache').success(addRepositories);
        $.get('./javascripts/partials/featured-repo.mustache').success(addFeaturedRepo);
	}

	return {
		init: init
	};
})();

pages.index.init();