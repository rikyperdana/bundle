(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var FS = Package['cfs:base-package'].FS;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/yogiben_autoform-file/lib/server/publish.coffee               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('autoformFileDoc', function (collectionName, docId) {
  var collection;
  check(collectionName, String);
  check(docId, String);
  collection = FS._collections[collectionName] || global[collectionName];

  if (collection) {
    return collection.find({
      _id: docId,
      'metadata.owner': this.userId
    });
  }
});
////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['yogiben:autoform-file'] = {};

})();

//# sourceURL=meteor://💻app/packages/yogiben_autoform-file.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMveW9naWJlbl9hdXRvZm9ybS1maWxlL2xpYi9zZXJ2ZXIvcHVibGlzaC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9zZXJ2ZXIvcHVibGlzaC5jb2ZmZWUiXSwibmFtZXMiOlsiTWV0ZW9yIiwicHVibGlzaCIsImNvbGxlY3Rpb25OYW1lIiwiZG9jSWQiLCJjb2xsZWN0aW9uIiwiY2hlY2siLCJTdHJpbmciLCJGUyIsIl9jb2xsZWN0aW9ucyIsImdsb2JhbCIsImZpbmQiLCJfaWQiLCJ1c2VySWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsT0FBT0MsT0FBUCxDQUFlLGlCQUFmLEVBQWtDLFVBQUNDLGNBQUQsRUFBaUJDLEtBQWpCO0FBQ2hDLE1BQUFDLFVBQUE7QUFBQUMsUUFBTUgsY0FBTixFQUFzQkksTUFBdEI7QUFDQUQsUUFBTUYsS0FBTixFQUFhRyxNQUFiO0FBRUFGLGVBQWFHLEdBQUdDLFlBQUgsQ0FBZ0JOLGNBQWhCLEtBQW1DTyxPQUFPUCxjQUFQLENBQWhEOztBQUNBLE1BQUdFLFVBQUg7QUNDRSxXREFBQSxXQUFXTSxJQUFYLENBQ0U7QUFBQUMsV0FBS1IsS0FBTDtBQUNBLHdCQUFrQixLQUFDUztBQURuQixLQURGLENDQUE7QUFJRDtBRFZILEciLCJmaWxlIjoiL3BhY2thZ2VzL3lvZ2liZW5fYXV0b2Zvcm0tZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIk1ldGVvci5wdWJsaXNoICdhdXRvZm9ybUZpbGVEb2MnLCAoY29sbGVjdGlvbk5hbWUsIGRvY0lkKSAtPlxuICBjaGVjayBjb2xsZWN0aW9uTmFtZSwgU3RyaW5nXG4gIGNoZWNrIGRvY0lkLCBTdHJpbmdcblxuICBjb2xsZWN0aW9uID0gRlMuX2NvbGxlY3Rpb25zW2NvbGxlY3Rpb25OYW1lXSBvciBnbG9iYWxbY29sbGVjdGlvbk5hbWVdXG4gIGlmIGNvbGxlY3Rpb25cbiAgICBjb2xsZWN0aW9uLmZpbmRcbiAgICAgIF9pZDogZG9jSWRcbiAgICAgICdtZXRhZGF0YS5vd25lcic6IEB1c2VySWRcbiIsIk1ldGVvci5wdWJsaXNoKCdhdXRvZm9ybUZpbGVEb2MnLCBmdW5jdGlvbihjb2xsZWN0aW9uTmFtZSwgZG9jSWQpIHtcbiAgdmFyIGNvbGxlY3Rpb247XG4gIGNoZWNrKGNvbGxlY3Rpb25OYW1lLCBTdHJpbmcpO1xuICBjaGVjayhkb2NJZCwgU3RyaW5nKTtcbiAgY29sbGVjdGlvbiA9IEZTLl9jb2xsZWN0aW9uc1tjb2xsZWN0aW9uTmFtZV0gfHwgZ2xvYmFsW2NvbGxlY3Rpb25OYW1lXTtcbiAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKHtcbiAgICAgIF9pZDogZG9jSWQsXG4gICAgICAnbWV0YWRhdGEub3duZXInOiB0aGlzLnVzZXJJZFxuICAgIH0pO1xuICB9XG59KTtcbiJdfQ==
