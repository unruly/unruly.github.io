var pages = pages || {};

pages.index = pages.index || (function() {
	function addContributors(template) {
		$.getJSON('./javascripts/data/devs.json').success(function(devsConfig) {
			$.getJSON('http://jahed.unruly.co/github/unruly/members').success(function(members) {
				var $contributors = $('#contributors');

				members
                    .filter(function(member) {
                        return !!devsConfig[member.login];
                    })
                    .forEach(function(member) {
                        var config = devsConfig[member.login];
                        var contributorHtml = Mustache.render(template, {
                            name: config.name || member.login,
                            image: member.avatar_url,
                            githubUrl: member.html_url,
                            links: config ? config.links : []
                        });

                        $contributors.append(contributorHtml);
                    });
			});
		});
	}

    function addDevelopers(template) {
        $.getJSON('./javascripts/data/devs.json').success(function(devsConfig) {
            $.getJSON('http://jahed.unruly.co/github/unruly/members').success(function(members) {
                var $developers = $('#developers');

                members
                    .filter(function(member) {
                        return !devsConfig[member.login];
                    })
                    .forEach(function(member) {
                        var developerHtml = Mustache.render(template, {
                            name: member.login,
                            image: member.avatar_url,
                            githubUrl: member.html_url
                        });

                        $developers.append(developerHtml);
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
        $.getJSON('./javascripts/data/posts.json').success(function (postsConfig) {
            $.ajax({
                url: 'http://video.cdn-unrulymedia-5.com/unruly.github.io/atom.xml',
                cache: false
            }).success(function (feedDocument) {
                var $feed = $(feedDocument).find('feed'),
                    $entries = $feed.find('feed > entry:lt(6)'),
                    $postsContainer = $('#postsContainer');

                function summariseText(text, length) {
                    var summary = text.substr(0, length);
                    if (/^\S/.test(text.substr(length))) {
                        summary = summary.replace(/\s+\S*$/, "");
                    }
                    return summary
                        .replace(/[_\W]$/, "")
                        .trim() + '&hellip;';
                }

                $entries.each(function () {
                    var $entry = $(this),
                        rawContent = $entry.find('> content').text(),
                        $content = $('<div>').append($.parseHTML(rawContent)),
                        image = $content.find('img:first-of-type').attr('src'),
                        summary = $('<div>')
                            .append($(
                                summariseText($('<div>').append(
                                    $content.find('p, blockquote, ul, ol, h1,h2,h3,h4,h5')
                                ).html(), 1000)
                            ))
                            .html();

                    var postHtml = Mustache.render(template, {
                        title: $entry.find('> title').text(),
                        summary: summary,
                        date: moment($entry.find('> updated').text()).fromNow(),
                        author: {
                            name: $entry.find('> author > name').text()
                        },
                        url: $entry.find('> link').attr('href'),
                        image: image
                    });

                    $postsContainer.append(postHtml);
                });

                $postsContainer.find('.loading').remove();
            });
        });
    }
	function init() {
		$.get('./javascripts/partials/featured-post.mustache').success(addFeaturedPost);
		$.get('./javascripts/partials/post.mustache').success(addLatestPosts);
        $.get('./javascripts/partials/contributor.mustache').success(addContributors);
        $.get('./javascripts/partials/developer.mustache').success(addDevelopers);
	}

	return {
		init: init
	};
})();

pages.index.init();