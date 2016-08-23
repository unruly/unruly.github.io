---
title: Modern XP, Join The Mob
description:
  The classic "Extreme Programming Explained" encourages us to embrace change and turn up the dials on good practice.
  But so much has changed in industry since the white book came out; descriptions of how work was done at Chrysler in
  the 90's almost sound archaic to the next generation of software developers. Although XP is not mainstream, we have
  an active community evolving XP practice work guided by XP values and principles. I'd like to make it easier for
  developers to find out what it means to practice modern XP.
author: Rachel Davies
date: 2015-04-15 12:00 UTC
published: true
original_url: http://rachelcdavies.github.io/2015/04/15/mob-programming.html
tags: initiatives
---

The classic "Extreme Programming Explained" encourages us to embrace change and turn up the dials on good practice. But so much has changed in industry since the white book came out; descriptions of how work was done at Chrysler in the 90's almost sound archaic to the next generation of software developers. Although XP is not mainstream, we have an active community evolving XP practice work guided by XP values and principles. I'd like to make it easier for developers to find out what it means to practice modern XP.

Paired programming is still the most controversial practice of XP. The benefits to any developer who has tried it are clear. Pairing helps retain focus on the task at hand while maintaining discipline on our approach to coding. Rotating partners fluidly on a team builds collective code ownership and shares knowledge across a team. The result is that all team members feel confident to change any part of the code. Yes, pair programming can be [intense](http://codurance.com/2015/03/15/rethinking-pair-programming/) but there are plenty of other activities that members of an XP team attend to -- if pair programming feels like a constant grind, you are doing it wrong!

As extreme programmers, we can turn up the dials on this collaborative programming and make it even more fun. Anyone who has sat with an XP team will notice that pairing often expands to tripling when a pair is wrestling with a tricky problem. [Mob Programming](http://www.mobprogramming.org) is the deliberate choice to work together as a team on a single story. I'm not talking about "swarming" where more than one pair works in parallel on the same story. Mobbing is where the whole team writes production code on a single machine.

Mobbing enables everyone on the team to get their head around a challenging problem and share their ideas on how to solve it. Although teams at [Unruly](http://tech.unruly.co/) initially planned mobbing by declaring "Mob Fridays" and later "Mob Mondays", anchoring mobbing to a particular day of the week doesn't work out that well. Mob programming is most useful on more challenging tasks that are complex enough to engage the minds of the whole team. If we wait to mob until Friday, the meaty work may already be done and more mundane tasks may be the most valuable to deliver that day -- no one enjoys being in a bored mob.

Now our teams decide whether to mob or pair when considering what to work on at morning standup. We pair on smaller pieces of work that will likely be delivered in a single day. We tend to mob when we're starting work on more critical code that everyone will need to maintain. In addition to developing production code, we usually have a bunch of other work to do - researching upcoming product features, helping our users apply our products to upcoming campaigns, and improving our knowledge of technical solutions available. For less critical code, we may run a "mini-mob" where 3 or 4 developers run a shorter mobbing session leaving remaining developers available to work on other tasks.

Practical aspects of our mob setup are different to other companies like [Hunter Industries](https://www.youtube.com/watch?v=p_pvslS4gEI) and [Ericsson](http://archive.vector.org.uk/art10501360). We mob in an open plan workspace shared by 3 teams, see photos below. Each team has one large high-resolution screen, which can be used for mob sessions. The team places another screen to the side and that's where the driver sits to write code. The team uses a timer to run "randori" style rotation, every 10 mins a developer switches into the driving seat. We have noticed that a developer can duck out of a mob session to attend to an interruption then quickly get back into the flow with very little disruption to the mob.

![Chutney Mob](http://rachelcdavies.github.io/images/ChutMob.jpg)

As a coach, I notice that mob programming helps us remember how important it is to keep our test runs and deployments fast -- we don't want to have a whole team of developers waiting around for the tests to eventually pass. Developers quickly enjoy mobbing, as they start cracking the problems in hand, deploying as they go. Mobs can get noisy for surrounding teams but that's generally fine, we're used to pairing in an open workspace. A team that's mobbing needs to take care not to get too carried away with the fun of working as a group. It helps to have breakout sessions around a whiteboard to discuss where the mob is headed so everyone has a clear picture of what they're working towards. In our space, the whiteboard-on-wheels also acts as a baffle to reduce noisy chatter leaking out.

I'll be giving a presentation about how our teams approach Mobbing at [Bristol Girl Geeks](http://www.meetup.com/Bristol-Girl-Geek-Dinners/events/221328972/) next week, check out the slides [here](http://www.slideshare.net/RachelDavies/mob-programming-47289482). Also [Alex Wilson](http://probablyfine.co.uk/) will be presenting his more in-depth experience report on Mob Programming at XP2015 conference in Finland in May. I  plan more posts here on the details of modern XP practice but in the meantime Benji Weber has already written up a great [summary](http://benjiweber.co.uk/blog/2015/04/17/modern-extreme-programming/). If you'd like to share how XP practice has evolved in your team then please do get in touch as we are on the look out for talks and demos for [Extreme Programmers London](http://tech.unruly.co/events.html) meetup.

