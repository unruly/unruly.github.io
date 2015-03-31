var pages = pages || {};

pages.index = pages.index || (function() {
	function addDevelopers(template) {
		$.getJSON('./javascripts/data/devs.json').success(function(devsConfig) {
			$.getJSON('http://jahed.unruly.co/github/unruly/members').success(function(members) {
				var $devsContainer = $('#devsContainer');

				members.forEach(function(member) {
					var personHtml = Mustache.render(template, {
						name: member.login,
						image: member.avatar_url,
						githubUrl: member.html_url,
						links: devsConfig[member.login] ? devsConfig[member.login].links : []
					});

					$devsContainer.append(personHtml);
				});
			});
		});
	}

	function addRepositories(template) {
		$.getJSON('./javascripts/data/repos.json').success(function(reposConfig) {
			$.getJSON('http://jahed.unruly.co/github/unruly/repos').success(function(repos) {
				var $reposContainer = $('#reposContainer');

				repos.forEach(function(repo) {
					var repoHtml = Mustache.render(template, {
						name: repo.name,
						description: repo.description,
						url: repo.html_url,
						image: reposConfig[repo.name] ? reposConfig[repo.name].image : './images/repo-placeholder.png'
					});

					$reposContainer.append(repoHtml);
				});
			});
		});
	}

	function addFeaturedPost(template) {
		$.getJSON('./javascripts/data/posts.json').success(function(postsConfig) {
			var $featuredPostContainer = $('#featuredPostContainer');

			var featuredPostHtml = Mustache.render(template, {
				title: postsConfig.featuredPost.title,
				author: {
					name: postsConfig.featuredPost.author.name
				},
				link: postsConfig.featuredPost.link,
				image: postsConfig.featuredPost.image || './images/featured-post-placeholder.jpg'
			});

			$featuredPostContainer.append(featuredPostHtml);
		});
	}


	function addLatestPosts(template) {
		$.getJSON('./javascripts/data/posts.json').success(function(postsConfig) {
			$.ajax({
				url: 'http://video.cdn-unrulymedia-5.com/unruly.github.io/atom.xml',
				cache: false
			}).success(function(feedDocument) {
				var $feed = $(feedDocument).find('feed'),
					$entries = $feed.find('feed > entry:lt(6)'),
					$featuredPostContainer = $('#postsContainer');

				function summariseText(text, length) {
					var summary = text.substr(0, length);
					if (/^\S/.test(text.substr(length))) {
						summary = summary.replace(/\s+\S*$/, "");
					}
					return summary
						.replace(/[_\W]$/, "")
						.trim();
				}

				$entries.each(function() {
					var $entry = $(this),
						rawContent = $entry.find('> content').text(),
						$content = $('<div>').append($.parseHTML(rawContent)),
						summary = summariseText($content.text(), 120),
						image = $content.find('img:first-of-type').attr('src');

					var postHtml = Mustache.render(template, {
						title: $entry.find('> title').text(),
						date: moment($entry.find('> updated').text()).fromNow(),
						summary: summary,
						author: {
							name: $entry.find('> author > name').text()
						},
						url: $entry.find('> link').attr('href'),
						image: image ||  './images/post-placeholder.png'
					});

					$featuredPostContainer.append(postHtml);
				});
			});
		});
	}

	function init() {
		$.get('./javascripts/partials/featured-post.mustache').success(addFeaturedPost);
		$.get('./javascripts/partials/post.mustache').success(addLatestPosts);
		$.get('./javascripts/partials/repo.mustache').success(addRepositories);
		$.get('./javascripts/partials/person.mustache').success(addDevelopers);
	}

	return {
		init: init
	};
})();

pages.index.init();