var ak = require('ak');
var base64 = require('base64');


exports.makeBasicAuthorizing = function (authorizer, prompt) {
  return function(func) {
    return function (request) {
      var auth = request.headers.authorization;
      if (auth) {
        var userpass = base64.decode(auth.split(' ')[1]).split(':');
        if (authorizer(userpass[0], userpass[1]))
          return func(request);
      }
      return new ak.Response(
        '', 
        ak.http.UNAUTHORIZED, 
        {'WWW-Authenticate': 'Basic realm="' + (prompt || 'Secure Area') + '"'});
    };
  };
};
