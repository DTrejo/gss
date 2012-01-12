(function testSync() {
  var _ = require('underscore')
    , gssSync = require('../gss').gssSync
    , f = function(x) { return Math.pow(x, 2); } // f(x) = x^2
    , min = gssSync(_.memoize(f), -100, -50, 100, Math.sqrt(1e-10));

  console.log(min, 'should be pretty darn close to zero.');

})();
