---
title: Working with parsed VAST documents
description: The VAST specification allows for quite a flexible document structure and so the objects representing the file may take various form. 
author: Tomas Libal
date: 2015-10-05 14:20 UTC
published: true
tags: javascript, VAST, vast-parser, opensource
---
Our [vast-parser](http://tech.unruly.co/vast-parser) includes a JavaScript helper utility that aims to make working with parsed VAST documents easier. [VAST](http://www.iab.net/vast) documents allow for many optional fields and so the output JSON objects may look very differently depending on the input. Imagine accessing the following nested property in some object:


    let linearCreative = VAST.Ad.InLine.Creatives.Creative.Linear;

If any property before *Linear* does not exist then this expression will throw a TypeError because the interpreter will try to read a property on something which is undefined.

With the *objectUtil* we can safely read any property using one of the util's static methods:


    let val = objectUtil.getFromObjectPath(foo, 'VAST.Ad.InLine.Creatives.Creative.Linear');

The first argument *foo* is an object storing the parsed VAST document and the second argument is "the lookup path" using the standard JSON/JavaScript access notation. This path will be recursively traversed from left to right, until either one of the properties is undefined in which case null is returned or the last property is found and its value is returned.

## The 'interface'

    ObjectUtil.getFromObjectPath(object={}, path='', defaultValue=null);

Reads from the *object* using the given *path* and returns the value of the property specified by the *path* or if not found, returns the *defaultValue* (null if not specified).

    ObjectUtil.getIntegerFromObjectPath(object={}, path='', defaultValue=null);

Same as above but converts the found value to an integer.

    ObjectUtil.getArrayFromObjectPath(object={}, path='');

Similar to the first method but sets the *defaultValue = [ ]* and if the found value is not an array, it wraps it into an array before returning it.

## Head, tail traversal

The lookup happens by splitting the path by the fullstop character and setting `head` and `tail` variables to the first part of the path and the rest respectively.
In an example:

    obj={...}, path='VAST.Ad.InLine.Creatives.Creative.Linear'
     
    1. head=obj['VAST'], tail=['Ad', 'InLine', 'Creatives', 'Creative', 'Linear']
    2. head=head['Ad'], tail=['InLine', 'Creatives', 'Creative', 'Linear']
    3. head=head['InLine'], tail=['Creatives', 'Creative', 'Linear']
    4. head=head['Creatives'], tail=['Creative', 'Linear']
    5. head=head['Creative'], tail=['Linear']


In each step, `head` is checked to be defined. If true, the code proceeds with updating `head` and `tail` values as illustrated in the above example until the tail's length is 1 when it returns `head[tail[0]]`. If head is undefined at any point, the `defaultValue` is returned.

## GitHub repository and documentation

We have open sourced the vast-parser project [on Github](https://github.com/unruly/vast-parser). It currently supports VAST 3.0 specification.

