var pages = pages || {};

pages.jobs = pages.jobs || (function() {
	var FOUR_MONTHS = 100*60*60*24*120;

	function addJobs(template) {
		$.getJSON('./javascripts/data/jobs.json').success(function(postsConfig) {
			$.get('http://jahed.unruly.co/rss/jobs.xml').success(function(rssDocument) {
				var $channel = $(rssDocument).find('channel'),
					$items = $channel.find('> item'),
					$jobsContainer = $('#jobsContainer');

				function isRecent(date) {
					var diff = new Date().getTime() - date.getTime();
					return diff < FOUR_MONTHS;
				}

				$items.each(function() {
					var $item = $(this),
						title = $item.find('> title').text(),
						link = $item.find('> link').text()
						date = new Date($item.find('> pubDate').text()),
						description = $($.parseHTML($item.find('> description').text())).text(),
						summary = /WANTED\:\s*([^\.]*\.)/.exec(description)[1];

					var jobHtml = Mustache.render(template, {
						title: title,
						link: link,
						date: date.toLocaleDateString(),
						summary: summary,
						recent: isRecent(date)
					});

					$jobsContainer.append(jobHtml);
				});
			});
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