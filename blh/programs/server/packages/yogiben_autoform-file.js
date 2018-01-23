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
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/yogiben_autoform-file/lib/server/publish.coffee.js            //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('autoformFileDoc', function (collectionName, docId) {      // 1
  var collection;                                                         // 2
  check(collectionName, String);                                          // 2
  check(docId, String);                                                   // 3
  collection = FS._collections[collectionName] || global[collectionName];
                                                                          //
  if (collection) {                                                       // 6
    return collection.find({                                              // 7
      _id: docId,                                                         // 8
      'metadata.owner': this.userId                                       // 9
    });                                                                   // 8
  }                                                                       // 11
});                                                                       // 1
////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['yogiben:autoform-file'] = {};

})();

//# sourceMappingURL=yogiben_autoform-file.js.map
