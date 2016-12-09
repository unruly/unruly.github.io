---
title: Building Products From the Inside-Out
description: A post about how we gradually productionise our products by building manually configured products before introducing user interfaces.
author: Rachel Davies
date: 2016-11-05 14:20 UTC
published: false
original_url: http://rachelcdavies.github.io/2016/11/05/building-products-inside-out.html
tags: product, lean startup, MVP
---

How exactly do you go about building minimum viable products following Eric Ries’s [Build-Measure-Learn](http://theleanstartup.com/principles) cycle set out in his [Lean Startup](http://theleanstartup.com/book) book? An approach you’ve probably heard about can be characterised as “Outside-In”. Start by building a interface that users can engage with and add implementation based on what you learn about their preferences from these interactions. This Outside-In technique is ideal for front-end heavy products aimed at the man-on-the-street. But what if you’re building services used by other businesses or your own?

An alternative technique, we use at Unruly, is to build minimum viable products “Inside-Out”. We start by building just enough product to generate business value and defer building any user interface to configure these products until a later date when we know more about what’s needed. How does this work in practice? Well, we build services that are configured on the inside by developers and only make features configurable from the outside when we’re confident we know enough about what generates revenue. This approach enables us to test the market for a feature and learn more about various configurations that are needed by our business before we add controls to make these features serve-serve.

Here’s a simple example. Say we’re being asked by our stakeholders to introduce the capability to block ads that don’t render properly - this is valuable to our business because these ads could win slots on publisher pages but if they don’t display properly we won’t be able to charge for them. When this request comes up, we don’t know how popular this ad blocking capability will be. We may be able to pursue alternative approaches to block ads at other points in the ad serving pipeline. We may also find that such ads cannot effectively be blocked in this way, if their identities only have a short lifetime. Given this situation, it doesn’t make sense for us to invest in making a user interface to configure ad blocking yet. 

Instead, our first step is implement a minimum viable product by adding the capability to block ads using a hard-coded list of ad ids in our real-time bidding exchange. Sounds yucky but we don’t know whether it’s worth investing more time in this yet. Once this is live, we let our business teams know to send in a support ticket when they’d like to get an ad blocked. Now we wait for support tickets to trickle in.

A couple weeks after the feature is released, we get our first support ticket requesting an ad to be blocked. The id to be blocked is added into our new list within the exchange and deployed. When the next ticket comes in, the list gets longer, this prompts a refactor to make it easier to manage the list of blocked ad ids. The day after that the original ad block is requested to be removed. Today we only have a single ad block in the exchange and so it’s definitely not worth investing in building a user interface to configure these.

If we continue to receive more requests, the activity to block ads via this hard coded list starts to eat up developer time. We now propose a story to move the list of blocked ad ids out into a flat file that can be manually edited by our solutions engineers and pushed to our servers using a script. If editing the configuration is fiddly, we’ll invest more time in scripts to make this easier and less error prone.

We are likely to operate ad blocking in MVP-mode for several months. When it becomes valuable enough to turn such ad blocking requests around faster, we’ll figure out a logical place to provide a user interface for our Ad Operations teams to configure this setting themselves. However, if this feature turns out not to be as valuable as anticipated, we’ll consider retiring this capability.

Are there any gotchas with this inside-out approach to building MVP? Well, this approach adds to the [carrying cost](https://michaelfeathers.silvrback.com/to-kill-code) of these features until they are fully productised. Some of these product features never get fully productised and the carrying cost for several months may end up as more than the implementation of fully fledged features. Our business users also end up waiting upto a day to have configuration set for them and there’s potential value lost by not being able to switch settings immediately. And yes sometimes systems feel a bit [Heath Robinson](https://en.wikipedia.org/wiki/W._Heath_Robinson) when configuration is done in various places at the backend.

The benefit for us, in taking an inside-out approach to building our products, is that we can get these features out of the door quickly and generate revenue quickly. Making product features available via manual configuration buys us time to figure out whether we want to invest in a proper self-serve business process around new features, that have been mooted before fully getting to grips with likely uptake and consequences.

Building products from the inside-out can be a useful technique in situations where configuration doesn’t need to be immediate and user experience is not a major factor in doing business. It takes a little extra time for everyone to get things setup to reap the benefits from features built this way but can be a useful way to test the business impact of an idea before baking into our operations user interface.

