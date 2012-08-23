[![build status](https://secure.travis-ci.org/DTrejo/gss.png)](http://travis-ci.org/DTrejo/gss)
Golden Section Search
===

A line search technique to help you find the minimum or maximum of a function. I've adapted the version from [wikipedia](en.wikipedia.org/wiki/Golden_section_search) to support async functions as well as synchronous ones :)

How to use
===

    npm install gss

The arguments are a bit bad, but here's how you'd use it:

    gss(asyncFunctionToMinimize, lowerBound, middleNumber, upperBound, precision, callback(err, min))
  
- `asyncFunctionToMinimize(x, cb)`: takes one argument, `x`, for which you are finding the argmax, and a callback that it calls when finished. It should call its callback like this: `cb(null, result)`.
- `lowerBound`: a number you think makes a lower bound to the solution
- `middleNumber`: any number between the upper and lower bounds
- `upperBound`: a number you think makes an upper bound to the solution
- `callback(err, min)`: a function to receive the results of the line search

The synchronous version takes a function that returns the result, and when it finishes it returns the result, so you don't need a callback. See the example below.

Async example:
===

    var gss = require('gss').gss

    // f(x) = x^2
    var f = function(x, cb) { cb(null, Math.pow(x, 2)); } 

    gss(f, -10, -7, 1, Math.sqrt(1e-10), function(err, min) {
      //
      // Now we have the min!
      //
      console.log(min, 'this should be prettty close to zero.');
    });
    
Sync example (you bad bad noder ;):

      var gssSync = require('gss').gssSync
      var f = function(x) { return Math.pow(x, 2); } // f(x) = x^2

      var min = gssSync(_.memoize(f), -100, -50, 100, Math.sqrt(1e-10))
      console.log(min, 'should be pretty darn close to zero.');

Gotchas
===
I recommend you use [`_.memoize`](http://documentcloud.github.com/underscore/#memoize) to make the minimization go as quickly as possible. If you'd like to maximize instead, have your function multiply by -1 before returning.

TODOs:
===
- tests
- automatically choose the `middleNumber`, to simplify API
