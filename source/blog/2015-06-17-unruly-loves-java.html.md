---
title: Unruly <3s Java
author: Alex Wilson
date: 2015-06-17 14:20 UTC
published: true
tags: java, opensource
---
Unruly has been built on Java and its ecosystem since the company was founded in 2006, and we want to share some of the stuff we've been doing with it.

Java 8 has opened the floodgates to new and exciting features that have been anticipated for years such as lambda-expressions and functional programming. But we're no longer just limited to features that the language provides us - we now have the power to go and implement our own!

[Benji Weber](http://benjiweber.co.uk/) is speaking at Devoxx UK this month about being [more expressive using Java 8](http://cfp.devoxx.co.uk/2015/talk/DFT-5935/Express_yourself_with_Java_8) - he'll be sharing his experiences not just with adopting Java 8's obvious new features but how they allow us to push the boundaries of what the language can do.

Unruly has also released some cool projects recently:

 * [java-8-matchers](http://tech.unruly.co/java-8-matchers) are a set of Hamcrest matchers based on new library features in Java 8 such as Streams, Optionals, and the new Time API.

 * [validation](http://tech.unruly.co/validation) is inspired by languages like Scala and Rust - it allows you to treat errors in a sensible way (by manipulating a pair of <Value, Error>) but also exposing the new functional style that Java 8 brought.

Both are available on Maven Central for immediate use.
