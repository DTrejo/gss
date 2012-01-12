(function test() {
  var _ = require('underscore')
    // the async version is default.
    , gss = require('../gss').gss
    , f = function(x, cb) { cb(null, Math.pow(x, 2)); } // f(x) = x^2
    ;

  // Here we run it:
  gss(_.memoize(f), -10, -7, 1, Math.sqrt(1e-10), function(err, min) {
    // now we have the min!
    console.log(min, 'this should be prettty close to zero.');
  });

})();
