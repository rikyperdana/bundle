(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ValidationError;

var require = meteorInstall({"node_modules":{"meteor":{"mdg:validation-error":{"validation-error.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/mdg_validation-error/validation-error.js                                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
/* global ValidationError:true */ /* global SimpleSchema */ // This is exactly what comes out of SS.
const errorSchema = new SimpleSchema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  details: {
    type: Object,
    blackbox: true,
    optional: true
  }
});
const errorsSchema = new SimpleSchema({
  errors: {
    type: Array
  },
  'errors.$': {
    type: errorSchema
  }
});
ValidationError = class extends Meteor.Error {
  constructor(errors, message = 'Validation Failed') {
    errorsSchema.validate({
      errors
    });
    super(ValidationError.ERROR_CODE, message, errors);
    this.errors = errors;
  }

}; // If people use this to check for the error code, we can change it
// in future versions

ValidationError.ERROR_CODE = 'validation-error';
///////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/mdg:validation-error/validation-error.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mdg:validation-error'] = {}, {
  ValidationError: ValidationError
});

})();

//# sourceURL=meteor://💻app/packages/mdg_validation-error.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvbWRnOnZhbGlkYXRpb24tZXJyb3IvdmFsaWRhdGlvbi1lcnJvci5qcyJdLCJuYW1lcyI6WyJlcnJvclNjaGVtYSIsIlNpbXBsZVNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwiZGV0YWlscyIsIk9iamVjdCIsImJsYWNrYm94Iiwib3B0aW9uYWwiLCJlcnJvcnNTY2hlbWEiLCJlcnJvcnMiLCJBcnJheSIsIlZhbGlkYXRpb25FcnJvciIsIk1ldGVvciIsIkVycm9yIiwiY29uc3RydWN0b3IiLCJtZXNzYWdlIiwidmFsaWRhdGUiLCJFUlJPUl9DT0RFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQyxDQUNBLHlCLENBRUE7QUFDQSxNQUFNQSxjQUFjLElBQUlDLFlBQUosQ0FBaUI7QUFDbkNDLFFBQU07QUFBQ0MsVUFBTUM7QUFBUCxHQUQ2QjtBQUVuQ0QsUUFBTTtBQUFDQSxVQUFNQztBQUFQLEdBRjZCO0FBR25DQyxXQUFTO0FBQUNGLFVBQU1HLE1BQVA7QUFBZUMsY0FBVSxJQUF6QjtBQUErQkMsY0FBVTtBQUF6QztBQUgwQixDQUFqQixDQUFwQjtBQU1BLE1BQU1DLGVBQWUsSUFBSVIsWUFBSixDQUFpQjtBQUNwQ1MsVUFBUTtBQUFDUCxVQUFNUTtBQUFQLEdBRDRCO0FBRXBDLGNBQVk7QUFBQ1IsVUFBTUg7QUFBUDtBQUZ3QixDQUFqQixDQUFyQjtBQUtBWSxrQkFBa0IsY0FBY0MsT0FBT0MsS0FBckIsQ0FBMkI7QUFDM0NDLGNBQVlMLE1BQVosRUFBb0JNLFVBQVUsbUJBQTlCLEVBQW1EO0FBQ2pEUCxpQkFBYVEsUUFBYixDQUFzQjtBQUFDUDtBQUFELEtBQXRCO0FBRUEsVUFBTUUsZ0JBQWdCTSxVQUF0QixFQUFrQ0YsT0FBbEMsRUFBMkNOLE1BQTNDO0FBRUEsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBUDBDLENBQTdDLEMsQ0FVQTtBQUNBOztBQUNBRSxnQkFBZ0JNLFVBQWhCLEdBQTZCLGtCQUE3QixDIiwiZmlsZSI6Ii9wYWNrYWdlcy9tZGdfdmFsaWRhdGlvbi1lcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBWYWxpZGF0aW9uRXJyb3I6dHJ1ZSAqL1xuLyogZ2xvYmFsIFNpbXBsZVNjaGVtYSAqL1xuXG4vLyBUaGlzIGlzIGV4YWN0bHkgd2hhdCBjb21lcyBvdXQgb2YgU1MuXG5jb25zdCBlcnJvclNjaGVtYSA9IG5ldyBTaW1wbGVTY2hlbWEoe1xuICBuYW1lOiB7dHlwZTogU3RyaW5nfSxcbiAgdHlwZToge3R5cGU6IFN0cmluZ30sXG4gIGRldGFpbHM6IHt0eXBlOiBPYmplY3QsIGJsYWNrYm94OiB0cnVlLCBvcHRpb25hbDogdHJ1ZX1cbn0pO1xuXG5jb25zdCBlcnJvcnNTY2hlbWEgPSBuZXcgU2ltcGxlU2NoZW1hKHtcbiAgZXJyb3JzOiB7dHlwZTogQXJyYXl9LFxuICAnZXJyb3JzLiQnOiB7dHlwZTogZXJyb3JTY2hlbWF9XG59KTtcblxuVmFsaWRhdGlvbkVycm9yID0gY2xhc3MgZXh0ZW5kcyBNZXRlb3IuRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihlcnJvcnMsIG1lc3NhZ2UgPSAnVmFsaWRhdGlvbiBGYWlsZWQnKSB7XG4gICAgZXJyb3JzU2NoZW1hLnZhbGlkYXRlKHtlcnJvcnN9KTtcblxuICAgIHN1cGVyKFZhbGlkYXRpb25FcnJvci5FUlJPUl9DT0RFLCBtZXNzYWdlLCBlcnJvcnMpO1xuXG4gICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gIH1cbn07XG5cbi8vIElmIHBlb3BsZSB1c2UgdGhpcyB0byBjaGVjayBmb3IgdGhlIGVycm9yIGNvZGUsIHdlIGNhbiBjaGFuZ2UgaXRcbi8vIGluIGZ1dHVyZSB2ZXJzaW9uc1xuVmFsaWRhdGlvbkVycm9yLkVSUk9SX0NPREUgPSAndmFsaWRhdGlvbi1lcnJvcic7XG4iXX0=
