// 
// based on http://en.wikipedia.org/wiki/Golden_section_search
// JS version by David Trejo (http://dtrejo.com/)
// 
var self = exports
  , phi = (1 + Math.sqrt(5)) / 2
  , resphi = 2 - phi;

self.gss = function goldenSectionSearch(f, x1, x2, x3, tau, callback) {

  // Create a new possible center in the area between x2 and x3, closer to x2
  var x4 = x2 + resphi * (x3 - x2);

  // Evaluate termination criterion
  if (Math.abs(x3 - x1) < tau * (Math.abs(x2) + Math.abs(x4))) {
    callback && callback(null, (x3 + x1) / 2);
  } else {
    // TODO: make these parallel...
    f(x4, function(err, fx4) {
        if (err) callback(err);
      
      f(x2, function(err, fx2) {
        if (err) callback(err);
        
        if (fx4 < fx2) {
          goldenSectionSearch(f, x2, x4, x3, tau, callback);
        } else {
          goldenSectionSearch(f, x4, x2, x1, tau, callback);
        }
      });
    });
  }
};
 
// x1 and x3 are the current bounds; the minimum is between them.
// x2 is the center point, which is closer to x1 than to x3
self.gssSync = function goldenSectionSearchSync(f, x1, x2, x3, tau) {
 
  // Create a new possible center in the area between x2 and x3, closer to x2
  var x4 = x2 + resphi * (x3 - x2);

  // Evaluate termination criterion
  if (Math.abs(x3 - x1) < tau * (Math.abs(x2) + Math.abs(x4))) {
    return (x3 + x1) / 2;
  }

  if (f(x4) < f(x2)) {
    return goldenSectionSearchSync(f, x2, x4, x3, tau);
  } else {
    return goldenSectionSearchSync(f, x4, x2, x1, tau);
  }
};