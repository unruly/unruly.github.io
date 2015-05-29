var pages = pages || {};

pages.jobs = pages.jobs || (function() {

	function addJobs(template) {
        $.get('http://jahed.unruly.co/rss/jobs.xml').success(function(rssDocument) {
            var $channel = $(rssDocument).find('channel'),
                $items = $channel.find('> item'),
                $jobsContainer = $('#jobsContainer');

            function isRecent(date) {
                return date.isAfter(moment().subtract(6, 'months'));
            }

            $items
                .sort(function(a, b) {
                    var dateA = moment(new Date($(a).find('> pubDate').text())),
                        dateB = moment(new Date($(b).find('> pubDate').text()));

                    return dateB.diff(dateA);
                })
                .each(function() {
                var $item = $(this),
                    title = $item.find('> title').text(),
                    link = $item.find('> link').text(),
                    date = moment(new Date($item.find('> pubDate').text())),
                    description = $($.parseHTML($item.find('> description').text())).text(),
                    summary = /WANTED\:\s*([^\.]*\.)/.exec(description)[1];

                var jobHtml = Mustache.render(template, {
                    title: title,
                    link: link,
                    date: date.fromNow(),
                    summary: summary,
                    recent: isRecent(date)
                });

                $jobsContainer.append(jobHtml);
            });

            $jobsContainer.find('.loading').remove();
        });
	}

	function init() {
		$.get('./javascripts/partials/job.mustache').success(addJobs);
	}

	return {
		init: init
	};
})();

pages.jobs.init();