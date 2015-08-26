var pages = pages || {};

pages.events = pages.events || (function() {
	function addUpcomingEvent(template) {
		var upcomingEventDeferred = $.getJSON('http://api.tech.unruly.co/meetup/2/events?group_urlname=Extreme-Programmers-London&page=1&status=upcoming,proposed&desc=true');

		$.when(upcomingEventDeferred).done(
			function(upcomingEventResult) {
				var $upcomingEventContainer = $('#upcomingEventContainer'),
					upcomingEvent = upcomingEventResult.results[0];

				var upcomingEventHtml = Mustache.render(template, {
					name: upcomingEvent.name,
					descriptionHtml: upcomingEvent.description,
					link: upcomingEvent.event_url,
                    date: upcomingEvent.time ? moment(upcomingEvent.time).format('[on] dddd[,] MMMM Do YYYY [at] HH:mmA') : null,
					image: './images/upcoming-event-placeholder.jpg',
					membersCount: upcomingEvent.yes_rsvp_count + upcomingEvent.maybe_rsvp_count
				});

				$upcomingEventContainer.append(upcomingEventHtml);
			}
		);
	}

	function addMeetupInfo(template) {
		var groupDeferred = $.getJSON('http://api.tech.unruly.co/meetup/2/groups?group_urlname=Extreme-Programmers-London');
		var latestMembersDeferred = $.getJSON('http://api.tech.unruly.co/meetup/2/members?group_urlname=Extreme-Programmers-London&page=5&order=joined&desc=true');
		var latestPhotosDeferred = $.getJSON('http://api.tech.unruly.co/meetup/2/photos?group_urlname=Extreme-Programmers-London&order=time&page=10');
		var pastEventsDeferred = $.getJSON('http://api.tech.unruly.co/meetup/2/events?group_urlname=Extreme-Programmers-London&page=3&status=past&desc=true');

		$.when(groupDeferred, latestMembersDeferred, latestPhotosDeferred, pastEventsDeferred).done(
			function(groupResult, latestMembersResult, latestPhotosResult, pastEventsResult) {
				var $aboutMeetupContainer = $('#about'),
					group = groupResult[0].results[0],
					latestMembers = latestMembersResult[0].results,
					latestPhotos = latestPhotosResult[0].results,
					pastEvents = pastEventsResult[0].results;

				latestMembers.forEach(function(member) {
					member.joined = moment(member.joined).fromNow();
					member.url = member.link;
                    member.photo = member.photo || {};
                    member.photo.photo_link = member.photo.photo_link || '/images/unknown-avatar.png'
				});

				pastEvents.forEach(function(event) {
					event.time = moment(event.time).fromNow();
				});

				var aboutMeetupHtml = Mustache.render(template, {
					name: group.name,
					descriptionHtml: group.description,
					link: group.link,
					logo: group.group_photo.highres_link,
					images: latestPhotos,
					memberCount: group.members,
					latestMembers: latestMembers,
					location: group.city + ', ' + group.country,
					pastEvents: pastEvents
				});

                $aboutMeetupContainer.find('.loading').remove();
                $aboutMeetupContainer.append(aboutMeetupHtml);

                Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/themes/classic/galleria.classic.min.js');
                Galleria.run('.galleria', {
                    height: 500,
                    lightbox: true
                });
            }
		);
	}

	function init() {
		$.get('./javascripts/partials/upcoming-event.mustache').done(addUpcomingEvent);
		$.get('./javascripts/partials/about-meetup.mustache').done(addMeetupInfo);
	}

	return {
		init: init
	};
})();


pages.events.init();
