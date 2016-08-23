var pages = pages || {};

pages.developer_blogs = pages.developer_blogs || (function() {
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
                    .trim();
            }

            $entries.each(function () {
                var $entry = $(this),
                    rawContent = $entry.find('> content').text(),
                    $content = $('<div>').append($.parseHTML(rawContent)),
                    image = $content.find('img:first-of-type').attr('src'),
                    summary = $('<div>')
                        .append($(
                            summariseText($('<div>').append(
                                $content
                            ).html(), 2000)
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
        $.get('./javascripts/partials/developer-post.mustache').success(addLatestPosts);
    }

    return {
        init: init
    };
})();

pages.developer_blogs.init();