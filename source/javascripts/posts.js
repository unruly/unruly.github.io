var pages = pages || {};

pages.posts = pages.posts || (function() {

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

    function addLatestPosts(template) {
        $.ajax({
            url: 'http://video.cdn-unrulymedia-5.com/unruly.github.io/atom.xml',
            cache: false
        }).success(function (feedDocument) {
            var $feed = $(feedDocument).find('feed'),
                $entries = $feed.find('feed > entry:lt(10)'),
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
                    image = $content.find('img').filter(function(index) {
                        return this.width > 200;
                    }).attr('src'),
                    summary = $('<div>')
                        .append($(
                            summariseText($('<div>').append(
                                $content.find('>blockquote, >p, >ul, >ol, >h1, >h2, >h3, >h4, >h5').clone()
                            ).html(), 1000)
                        ))
                        .html();

                var postHtml = Mustache.render(template, {
                    title: $entry.find('> title').text(),
                    summary: summary,
                    date: moment($entry.find('> updated').text()).format('MMM DD, YYYY'),
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
    }

    function init() {
        $.get('./javascripts/partials/post.mustache').success(addLatestPosts);
        $.get('./javascripts/partials/contributor.mustache').success(addContributors);
        $.get('./javascripts/partials/developer.mustache').success(addDevelopers);
    }

    return {
        init: init
    };
})();

pages.posts.init();