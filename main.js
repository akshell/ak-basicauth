require('ak').setup();
var makeBasicAuthorizing = require('index').makeBasicAuthorizing;


exports.tests = {
  MainTest: TestCase.subclass(
    {
      test: function () {
        var handler =
          function (request) { return 42; }.decorated(
            makeBasicAuthorizing(
              function (user, pass) {
                return user == 'oleg' && pass == '1q2w3e';
              }));
        assertSame(
          handler({headers: {authorization: 'basic b2xlZzoxcTJ3M2U='}}), 42);
        assertSame(
          handler({headers: {authorization: 'basic bla'}}).status,
          http.UNAUTHORIZED);
        assertSame(
          handler({headers: {}}).headers['WWW-Authenticate'],
          'Basic realm="Secure Area"');
      }
    })
};
